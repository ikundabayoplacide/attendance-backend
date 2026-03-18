"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AttendEvent extends sequelize_1.Model {
}
AttendEvent.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
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
    hoster: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: "users",
            key: "id"
        }
    },
    eventDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    eventTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true,
        validate: {
            isTime: true
        }
    },
    expectedAttendees: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    timeDuration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    eventLocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'cancelled', 'onhold', 'confirmed'),
        allowNull: true,
        defaultValue: 'pending'
    }
}, {
    tableName: 'events',
    sequelize: database_1.default,
    timestamps: true,
    paranoid: false,
    modelName: 'AttendEvent',
    indexes: [
        {
            unique: true,
            fields: ['title']
        }
    ]
});
exports.default = AttendEvent;
//# sourceMappingURL=event.js.map