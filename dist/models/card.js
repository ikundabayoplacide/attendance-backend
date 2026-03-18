"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Card extends sequelize_1.Model {
}
Card.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    cardNumber: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    branch: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Activated', 'Unactivated'),
        defaultValue: 'Unactivated'
    },
    doneBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    assignedTo: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    }
}, {
    tableName: 'cards',
    sequelize: database_1.default,
    modelName: 'Card',
    paranoid: true,
    timestamps: true
});
exports.default = Card;
//# sourceMappingURL=card.js.map