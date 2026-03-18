"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class RolePermission extends sequelize_1.Model {
}
RolePermission.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    permissionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        references: {
            model: 'permissions',
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
    tableName: 'role_permissions',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'RolePermission',
    indexes: [
        {
            unique: true,
            fields: ['permissionId', 'roleId']
        }
    ]
});
exports.default = RolePermission;
//# sourceMappingURL=rolePermission.js.map