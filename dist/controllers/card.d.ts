import { Controller } from "tsoa";
import { CardResponse } from "../types/responses";
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
    branch?: string;
    status: 'Activated' | 'Unactivated';
    doneBy: string;
    assignedTo?: string;
}
export interface UpdateCardRequest {
    cardNumber?: string;
    location?: string;
    branch?: string;
    status?: 'Activated' | 'Unactivated';
    doneBy?: string;
    assignedTo?: string;
}
export declare class CardController extends Controller {
    getAllCards(): Promise<CardListResponse>;
    createCard(body: CreateCardRequest): Promise<CardSingleResponse>;
    getCard(id: string): Promise<CardSingleResponse>;
    assignCard(id: string, body: {
        userId: string;
    }): Promise<CardSingleResponse>;
    updateCard(id: string, body: UpdateCardRequest): Promise<CardSingleResponse>;
    deleteCard(id: string): Promise<CardSingleResponse>;
}
