import { Model,Optional } from "sequelize";
import {IRoleAttributes} from "./role-type";

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'| 'deleted'| 'archived'|'rejected';

export interface IUserAttributes{
    id:string;
    fullName:string;
    email:string;
    password:string;
    phoneNumber?: string|number;
    status:UserStatus;
    roles?: IRoleAttributes[];
    createdAt:Date;
    updatedAt:Date;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'|'status'|'roles'|'createdAt'|'updatedAt'> {}
