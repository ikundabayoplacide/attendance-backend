import {Model, DataTypes,Optional, Transaction} from "sequelize";
import sequelize from "../config/database";
import Role from "./roles";

interface IUserAttributes {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string|number;
    password: string;
    status: string;
    UserRoles?: any[];
    createdAt?: Date;
    updatedAt?: Date;
}

class User extends Model<IUserAttributes, Optional<IUserAttributes, 'id'|'status'|'UserRoles'|'createdAt'|'updatedAt'>> implements IUserAttributes {
    async addRole(role: Role, options?: { transaction?: Transaction }): Promise<void> {
        const UserRole = sequelize.models.UserRole as any;
        await UserRole.create({
            userId: this.id,
            roleId: role.id
        }, options);
    }
    declare id: string;
    declare fullName: string;
    declare phoneNumber?: string|number;
    declare email: string;
    declare password: string;
    declare status: string;
    declare UserRoles?: any[];
    declare roles?:Role[];
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;


// Sequelize association methods
declare getRoles:(options?:any)=>Promise<Role[]>;
}


User.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:true,
    },
    fullName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        },
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
            notEmpty:true,
        },
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            notEmpty:true,
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[6,100],
        },
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted', 'archived', 'rejected'),
        allowNull:false,
        defaultValue:'pending',
    },
    },{
        tableName:'users',
        sequelize,
        timestamps:true,
        paranoid:false,
        modelName:'User',
        indexes:[
            {
                unique:true,
                fields:['email'],
            }
        ]
    });

export default User;