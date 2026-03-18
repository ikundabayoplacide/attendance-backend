import { Model,DataTypes,Optional } from "sequelize";
import sequelize from "../config/database";

interface CardAttributes{
    id:string;
    cardNumber:string;
    location?:string;
    branch?:string;
    status:'Activated'|'Unactivated';
    doneBy:string;
    assignedTo?:string;
    createdAt?:Date;
    updatedAt?:Date;
}

class Card extends Model<CardAttributes,Optional<CardAttributes,'id'|'status'|'location'|'branch'|'assignedTo'|'createdAt'|'updatedAt'>>implements CardAttributes{
    declare id:string;
    declare cardNumber:string;
    declare location?:string;
    declare branch?:string;
    declare status:'Activated'|'Unactivated';
    declare doneBy:string;
    declare assignedTo?:string;
    declare readonly createdAt?:Date;
    declare readonly updatedAt?:Date;
}
Card.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    cardNumber:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:true
    },
    location:{
        type:DataTypes.STRING,
        allowNull:true
    },
    branch:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM('Activated','Unactivated'),
        defaultValue:'Unactivated'
    },
    doneBy:{
        type:DataTypes.UUID,
        allowNull:false
    },
    assignedTo:{
        type:DataTypes.UUID,
        allowNull:true
    }
},{
    tableName:'cards',
    sequelize,
    modelName:'Card',
    paranoid:true,
    timestamps:true
})
export default Card;