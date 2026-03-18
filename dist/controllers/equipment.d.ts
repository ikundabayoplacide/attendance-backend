import { ServiceResponse } from "../utils/serviceResponse";
import { Controller } from "tsoa";
import { EquipementResponse } from "../types/responses";
export declare class EquipementCreateAttributes {
    name: string;
    description?: string | null;
    serialNumber?: string;
    quantity?: number;
    status?: string;
    assignedTo?: string | null;
}
export declare class EquipementUpdateAttributes {
    name?: string;
    description?: string | null;
    serialNumber?: string | null;
    quantity?: number;
    status?: string;
    assignedTo?: string | null;
}
export declare class EquipementController extends Controller {
    getAllEquipements(): Promise<ServiceResponse<EquipementResponse[] | null>>;
    getEquipementById(equipementId: string): Promise<ServiceResponse<EquipementResponse | null>>;
    createEquipement(data: EquipementCreateAttributes): Promise<ServiceResponse<EquipementResponse | null>>;
    updateEquipement(equipementId: string, data: EquipementUpdateAttributes): Promise<ServiceResponse<EquipementResponse | null>>;
    assignEquipement(equipementId: string, data: {
        userId: string;
    }): Promise<ServiceResponse<EquipementResponse | null>>;
    deleteEquipement(equipementId: string): Promise<ServiceResponse<null>>;
}
