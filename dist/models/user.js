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
        allowNull: true,
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
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [6, 100],
        },
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    badge: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    company: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive', 'suspended', 'pending', 'deleted', 'archived', 'rejected', 'blacklisted'),
        allowNull: false,
        defaultValue: 'pending',
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    nationalId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    scannedId: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    fingerPrint: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    face: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    voice: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    signature: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    passport: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    motion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    igipande: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    ocr: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    gesture: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    pupil: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    otherBiometric: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    // address details
    nationality: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    province: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    district: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    sector: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cell: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    village: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    //personal in charge details
    personalInChargeNationalId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    personalInChargeName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    personalInChargePhone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    personalInChargeEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    personalInChargeRelation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    personalInChargeOtherDetails: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
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
//# sourceMappingURL=user.js.map