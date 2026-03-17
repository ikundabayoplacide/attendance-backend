import { ServiceResponse } from "../utils/serviceResponse";
import { asyncCatch } from "../middlewares/errorHandler";
import { Body, Controller, Delete, Get, Path, Post, Put, Response, Route, Security, Tags } from "tsoa";
import Equipement from "../models/equipment";
import { EquipementResponse } from "../types/responses";

export class EquipementCreateAttributes {
    declare name: string;
    declare description?: string | null;
    declare serialNumber?: string;
    declare quantity?: number;
    declare status?: string;
    declare assignedTo?: string | null;
}

export class EquipementUpdateAttributes {
    declare name?: string;
    declare description?: string | null;
    declare serialNumber?: string | null;
    declare quantity?: number;
    declare status?: string;
    declare assignedTo?: string | null;
}

@Route('api/equipements')
@Tags('Equipements')
export class EquipementController extends Controller {

    @Security('jwt', ['equipement:read'])
    @Get('/')
    @asyncCatch
    @Response<ServiceResponse<EquipementResponse>>(404, 'Equipements not found')
    public async getAllEquipements(): Promise<ServiceResponse<EquipementResponse[] | null>> {
        const equipements = await Equipement.findAll({ order: [['name', 'ASC']] });
        return ServiceResponse.success('Equipements retrieved successfully', equipements.map((e: Equipement) => e.toJSON() as EquipementResponse));
    }

    @Security('jwt', ['equipement:read'])
    @Get('/{equipementId}')
    @asyncCatch
    @Response<ServiceResponse<EquipementResponse|null>>(404, 'Equipement not found')
    public async getEquipementById(@Path() equipementId: string): Promise<ServiceResponse<EquipementResponse | null>> {
        const equipement = await Equipement.findByPk(equipementId);
        if (!equipement) {
            return ServiceResponse.failure('Equipement not found', null, 404);
        }
        return ServiceResponse.success('Equipement retrieved successfully', equipement.toJSON() as EquipementResponse);
    }

    @Security('jwt', ['equipement:create'])
    @Post('/')
    @asyncCatch
    @Response<ServiceResponse<EquipementResponse>>(409, 'Equipement already exists')
    public async createEquipement(@Body() data: EquipementCreateAttributes): Promise<ServiceResponse<EquipementResponse | null>> {
        const existingEquipement = await Equipement.findOne({ where: { name: data.name } });
        if (existingEquipement) {
            return ServiceResponse.failure('Equipement already exists', null, 409);
        }
        const created = await Equipement.create({ ...data, serialNumber: data.serialNumber ?? null });
        return ServiceResponse.success('Equipement created successfully', created.toJSON() as EquipementResponse, 201);
    }

    @Security('jwt', ['equipement:update'])
    @Put('/{equipementId}')
    @asyncCatch
    @Response<ServiceResponse<EquipementResponse|null>>(404, 'Equipement not found')
    public async updateEquipement(
        @Path() equipementId: string,
        @Body() data: EquipementUpdateAttributes
    ): Promise<ServiceResponse<EquipementResponse | null>> {
        const equipement = await Equipement.findByPk(equipementId);
        if (!equipement) {
            return ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.update(data);
        return ServiceResponse.success('Equipement updated successfully', equipement.toJSON() as EquipementResponse);
    }

    // Assign Equipement to user
    @Security('jwt', ['equipement:update'])
    @Put('/{equipementId}/assign')
    @asyncCatch
    @Response<ServiceResponse<null>>(404, 'Equipement not found')
    public async assignEquipement(
        @Path() equipementId: string,
        @Body() data: { userId: string }
    ): Promise<ServiceResponse<EquipementResponse | null>> {
        const equipement = await Equipement.findByPk(equipementId);
        if (!equipement) {
            return ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.update({ assignedTo: data.userId, status: 'inuse' });
        return ServiceResponse.success('Equipement assigned successfully', equipement.toJSON() as EquipementResponse);
    }

    @Security('jwt', ['equipement:delete'])
    @Delete('/{equipementId}')
    @asyncCatch
    @Response<ServiceResponse<EquipementResponse|null>>(404, 'Equipement not found')
    public async deleteEquipement(@Path() equipementId: string): Promise<ServiceResponse<null>> {
        const equipement = await Equipement.findByPk(equipementId);
        if (!equipement) {
            return ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.destroy();
        return ServiceResponse.success('Equipement deleted successfully', null);
    }
}
