"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Attendance extends sequelize_1.Model {
}
Attendance.init({
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
    checkIn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    checkOut: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    hoster: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    badge: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('present', 'late', 'left_early', 'absent'),
        allowNull: false,
        defaultValue: 'present',
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'attendance',
    sequelize: database_1.default,
    timestamps: true,
    modelName: 'Attendance',
});
exports.default = Attendance;
//# sourceMappingURL=attendance.js.map