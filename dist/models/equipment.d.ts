import { Model, Optional } from "sequelize";
interface EquipmentAttributes {
    id: string;
    name: string;
    description?: string | null;
    serialNumber?: string | null;
    quantity?: number;
    assignedTo?: string | null;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare class Equipements extends Model<EquipmentAttributes, Optional<EquipmentAttributes, 'id' | 'createdAt' | 'updatedAt'>> implements EquipmentAttributes {
    id: string;
    name: string;
    description: string;
    serialNumber: string | null;
    quantity: number;
    assignedTo: string | null;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static associations: {
        users: any;
    };
}
export default Equipements;
