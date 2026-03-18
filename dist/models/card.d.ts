import { Model, Optional } from "sequelize";
interface CardAttributes {
    id: string;
    cardNumber: string;
    location?: string;
    branch?: string;
    status: 'Activated' | 'Unactivated';
    doneBy: string;
    assignedTo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare class Card extends Model<CardAttributes, Optional<CardAttributes, 'id' | 'status' | 'location' | 'branch' | 'assignedTo' | 'createdAt' | 'updatedAt'>> implements CardAttributes {
    id: string;
    cardNumber: string;
    location?: string;
    branch?: string;
    status: 'Activated' | 'Unactivated';
    doneBy: string;
    assignedTo?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export default Card;
