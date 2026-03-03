import { Model, Optional, Transaction } from "sequelize";
import Role from "./roles";
interface IUserAttributes {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string | number;
    password: string;
    status: string;
    UserRoles?: any[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare class User extends Model<IUserAttributes, Optional<IUserAttributes, 'id' | 'status' | 'UserRoles' | 'createdAt' | 'updatedAt'>> implements IUserAttributes {
    addRole(role: Role, options?: {
        transaction?: Transaction;
    }): Promise<void>;
    id: string;
    fullName: string;
    phoneNumber?: string | number;
    email: string;
    password: string;
    status: string;
    UserRoles?: any[];
    roles?: Role[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    getRoles: (options?: any) => Promise<Role[]>;
}
export default User;
