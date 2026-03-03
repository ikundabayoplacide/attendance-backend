import { Model, Optional } from "sequelize";
export interface IUserRoleAttributes {
    id: string;
    userId: string;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserRoleCreationAttributes extends Optional<IUserRoleAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class UserRole extends Model<IUserRoleAttributes, IUserRoleCreationAttributes> implements IUserRoleAttributes {
    id: string;
    userId: string;
    roleId: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export default UserRole;
