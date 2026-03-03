"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    async addRole(role, options) {
        const UserRole = database_1.default.models.UserRole;
        await UserRole.create({
            userId: this.id,
            roleId: role.id
        }, options);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100],
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted', 'archived', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    tableName: 'users',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'User',
    indexes: [
        {
            unique: true,
            fields: ['email'],
        }
    ]
});
exports.default = User;
//# sourceMappingURL=users.js.map