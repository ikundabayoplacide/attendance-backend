import { ServiceResponse } from "../utils/serviceResponse";
import { Controller } from "tsoa";
import { HandoverResponse } from "../types/responses";
export declare class HandoverCreateAttributes {
    outgoingUser: string;
    incomingUser: string;
    equipmentId?: string | null;
    handOverDate: Date;
    handOverTime: string;
    handOverDescription?: string | null;
    handOverItems: string;
    handOverShift: string;
    status: string;
}
export declare class HandoverUpdateAttributes {
    outgoingUser?: string;
    incomingUser?: string;
    equipmentId?: string | null;
    handOverDate?: Date;
    handOverTime?: string;
    handOverDescription?: string | null;
    handOverItems?: string;
    handOverShift?: string;
    status?: string;
}
export declare class HandoverController extends Controller {
    getAllHandovers(): Promise<ServiceResponse<HandoverResponse[] | null>>;
    getHandoverById(handoverId: string): Promise<ServiceResponse<HandoverResponse | null>>;
    createHandover(data: HandoverCreateAttributes): Promise<ServiceResponse<HandoverResponse | null>>;
    updateHandover(handoverId: string, data: HandoverUpdateAttributes): Promise<ServiceResponse<HandoverResponse | null>>;
    confirmHandleOver(handoverId: string): Promise<ServiceResponse<HandoverResponse | null>>;
    completeHandleOver(handoverId: string): Promise<ServiceResponse<HandoverResponse | null>>;
    cancelHandleOver(handoverId: string): Promise<ServiceResponse<HandoverResponse | null>>;
    deleteHandover(handoverId: string): Promise<ServiceResponse<HandoverResponse | null>>;
}
