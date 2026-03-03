"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const permissions_1 = __importDefault(require("./permissions"));
const roles_1 = __importDefault(require("./roles"));
const userRole_1 = __importDefault(require("./userRole"));
const users_1 = __importDefault(require("./users"));
const blacklistedToken_1 = __importDefault(require("./blacklistedToken"));
// Centralized associations  of all models for easy import in other parts of the application
users_1.default.belongsToMany(roles_1.default, {
    through: userRole_1.default,
    as: 'roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});
roles_1.default.belongsToMany(users_1.default, {
    through: userRole_1.default,
    as: 'users',
    foreignKey: 'roleId',
    otherKey: 'userId',
});
roles_1.default.belongsToMany(permissions_1.default, {
    through: 'role_permissions',
    as: 'permissions',
    foreignKey: 'roleId',
    otherKey: 'permissionId',
});
permissions_1.default.belongsToMany(roles_1.default, {
    through: 'role_permissions',
    as: 'roles',
    foreignKey: 'permissionId',
    otherKey: 'roleId',
});
const db = {
    sequelize: database_1.default,
    User: users_1.default,
    Role: roles_1.default,
    Permission: permissions_1.default,
    UserRole: userRole_1.default,
    BlacklistedToken: blacklistedToken_1.default,
};
exports.default = db;
//# sourceMappingURL=index.js.map