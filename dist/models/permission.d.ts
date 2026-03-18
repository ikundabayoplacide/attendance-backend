import { Model, Optional } from "sequelize";
interface IPermissionAttributes {
    id: string;
    name: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IPermissionCreationAttributes extends Optional<IPermissionAttributes, 'id' | 'description'> {
}
declare class Permission extends Model<IPermissionAttributes, IPermissionCreationAttributes> implements IPermissionAttributes {
    id: string;
    name: string;
    description?: string | null;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associations: {
        roles: any;
    };
}
export default Permission;
