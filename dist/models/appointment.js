"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Appointment extends sequelize_1.Model {
}
Appointment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    purpose: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    host: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    appointmentDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    appointmentTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    timeDuration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    appointmentLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'canceled', 'onhold', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    tableName: 'appointments',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'Appointment',
});
exports.default = Appointment;
//# sourceMappingURL=appointment.js.map