import { Model, Optional } from "sequelize";
interface IRolePermissionAttributes {
    id: string;
    permissionId: string;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IRolePermissionCreationAttributes extends Optional<IRolePermissionAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class RolePermission extends Model<IRolePermissionAttributes, IRolePermissionCreationAttributes> implements IRolePermissionAttributes {
    id: string;
    permissionId: string;
    roleId: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export default RolePermission;
