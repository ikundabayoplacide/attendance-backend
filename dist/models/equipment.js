"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Equipements extends sequelize_1.Model {
}
Equipements.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            isNumeric: true,
            min: 0
        }
    },
    assignedTo: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('available', 'inuse', 'maintenance', 'damaged', 'lost'),
        allowNull: true,
        defaultValue: 'available'
    }
}, {
    tableName: 'equipments',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'Equipements',
});
exports.default = Equipements;
//# sourceMappingURL=equipment.js.map