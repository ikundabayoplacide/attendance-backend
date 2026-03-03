import { Model, Optional } from "sequelize";
interface IBlacklistedTokenAttributes {
    id: string;
    token: string;
    expiresAt: Date;
    createdAt?: Date;
}
declare class BlacklistedToken extends Model<IBlacklistedTokenAttributes, Optional<IBlacklistedTokenAttributes, 'id' | 'createdAt'>> implements IBlacklistedTokenAttributes {
    id: string;
    token: string;
    expiresAt: Date;
    readonly createdAt?: Date;
}
export default BlacklistedToken;
