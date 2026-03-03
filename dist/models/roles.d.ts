import { Model, Optional } from "sequelize";
interface IRoleAttributes {
    id: string;
    name: string;
    description?: string | null;
    category?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IRoleCreationAttributes extends Optional<IRoleAttributes, 'id' | 'description'> {
}
declare class Role extends Model<IRoleAttributes, IRoleCreationAttributes> implements IRoleAttributes {
    id: string;
    name: string;
    description?: string | null;
    category?: string | null;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    static associations: {
        permissions: any;
    };
}
export default Role;
