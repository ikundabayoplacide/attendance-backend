"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserRole extends sequelize_1.Model {
}
UserRole.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: 'roles',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'user_roles',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'UserRole',
    indexes: [
        {
            unique: true,
            fields: ['userId', 'roleId']
        }
    ]
});
exports.default = UserRole;
//# sourceMappingURL=userRole.js.map