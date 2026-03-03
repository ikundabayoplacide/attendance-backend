"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class BlacklistedToken extends sequelize_1.Model {
}
BlacklistedToken.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
        unique: true,
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'blacklisted_tokens',
    sequelize: database_1.default,
    timestamps: true,
    updatedAt: false,
    modelName: 'BlacklistedToken',
    indexes: [
        {
            fields: ['token'],
        },
        {
            fields: ['expiresAt'],
        }
    ]
});
exports.default = BlacklistedToken;
//# sourceMappingURL=blacklistedToken.js.map