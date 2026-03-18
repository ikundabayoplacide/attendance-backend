import { Model, Optional } from "sequelize";
interface HandoverAttributes {
    id: string;
    outgoingUser: string;
    incomingUser: string;
    equipmentId?: string | null;
    handOverDate: Date;
    handOverTime: string;
    handOverDescription?: string | null;
    handOverItems: string;
    handOverShift: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare class Handover extends Model<HandoverAttributes, Optional<HandoverAttributes, 'id' | 'createdAt' | 'updatedAt'>> implements HandoverAttributes {
    id: string;
    outgoingUser: string;
    incomingUser: string;
    equipmentId: string | null;
    handOverDate: Date;
    handOverTime: string;
    handOverDescription: string | null;
    handOverItems: string;
    handOverShift: string;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Handover;
