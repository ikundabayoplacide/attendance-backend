"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Handover extends sequelize_1.Model {
}
Handover.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    outgoingUser: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    incomingUser: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    equipmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'equipments',
            key: 'id'
        }
    },
    handOverDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    handOverTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    handOverDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    handOverItems: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    handOverShift: {
        type: sequelize_1.DataTypes.ENUM('morning', 'afternoon', 'night'),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'handovers',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'Handover'
});
exports.default = Handover;
//# sourceMappingURL=handover.js.map