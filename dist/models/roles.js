"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Role extends sequelize_1.Model {
}
Role.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50],
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    category: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    }
}, {
    tableName: 'roles',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'Role',
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});
exports.default = Role;
//# sourceMappingURL=roles.js.map