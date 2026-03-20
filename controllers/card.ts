import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags } from "tsoa";
import { CardResponse } from "../types/responses";
import Card from "../models/card";
import { ServiceResponse } from "../utils/serviceResponse";

export interface CardListResponse {
    success: boolean;
    message: string;
    result: CardResponse[] | null;
    statusCode: number;
}

export interface CardSingleResponse {
    success: boolean;
    message: string;
    result: CardResponse | null;
    statusCode: number;
}

export interface CreateCardRequest {
    cardNumber: string;
    location?: string;
    description?:string;
    branch?: string;
    status: 'assigned' | 'available'|'maintenance';
    doneBy?: string;
    assignedTo?: string;
    assignedAt?: Date;
    lastUsed?: Date;
}

export interface UpdateCardRequest {
    cardNumber?: string;
    description?:string;
    location?: string;
    branch?: string;
    status?: 'assigned' | 'available'|'maintenance';
    doneBy?: string;
    assignedTo?: string;
    assignedAt?: Date;
    lastUsed?: Date;
}

@Route('api/cards')
@Tags('Cards')
export class CardController extends Controller{
    //get all cards
    @Security('jwt',['card:read'])
    @Get('/')
    public async getAllCards():Promise<CardListResponse>{
        const cards = await Card.findAll({order:[['createdAt','DESC']]});
        return ServiceResponse.success('Cards retrieved successfully', cards.map(c => c.toJSON()));
    }
    
    //create card
    @Security('jwt',['card:create'])
    @Post('/')
    public async createCard(@Body() body: CreateCardRequest): Promise<CardSingleResponse>{
        const card = await Card.create(body);
        return ServiceResponse.success('Card created successfully', card.toJSON(), 201);
    }

    //get single card
    @Security('jwt', ['card:read'])
    @Get('/{id}')
    public async getCard(@Path() id: string): Promise<CardSingleResponse>{
        const card = await Card.findByPk(id);
        if(!card) return ServiceResponse.failure('Card not found', null, 404);
        return ServiceResponse.success('Card retrieved successfully', card.toJSON());
    }

    //assign card to user
    @Security('jwt',['card:assign'])
    @Put('/assign/{id}')
    public async assignCard(@Path() id: string, @Body() body: {userId: string}): Promise<CardSingleResponse>{
        const card = await Card.findByPk(id);
        if(!card) return ServiceResponse.failure('Card not found', null, 404);
        await card.update({assignedTo: body.userId});
        return ServiceResponse.success('Card assigned successfully', card.toJSON());
    }

    // update card
    @Security('jwt', ['card:update'])
    @Put('/{id}')
    public async updateCard(@Path() id: string, @Body() body: UpdateCardRequest): Promise<CardSingleResponse>{
        const card = await Card.findByPk(id);
        if(!card) return ServiceResponse.failure('Card not found', null, 404);
        await card.update(body);
        return ServiceResponse.success('Card updated successfully', card.toJSON());
    }

    // delete card
    @Security('jwt', ['card:delete'])
    @Delete('/{id}')
    public async deleteCard(@Path() id: string): Promise<CardSingleResponse>{
        const card = await Card.findByPk(id);
        if(!card) return ServiceResponse.failure('Card not found', null, 404);
        await card.destroy();
        return ServiceResponse.success('Card deleted successfully', null);
    }
}