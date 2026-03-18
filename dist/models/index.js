"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const permission_1 = __importDefault(require("./permission"));
const role_1 = __importDefault(require("./role"));
const userRole_1 = __importDefault(require("./userRole"));
const user_1 = __importDefault(require("./user"));
const blacklistedToken_1 = __importDefault(require("./blacklistedToken"));
const appointment_1 = __importDefault(require("./appointment"));
const event_1 = __importDefault(require("./event"));
const equipment_1 = __importDefault(require("./equipment"));
const handover_1 = __importDefault(require("./handover"));
const attendance_1 = __importDefault(require("./attendance"));
const card_1 = __importDefault(require("./card"));
// Centralized associations  of all models for easy import in other parts of the application
user_1.default.belongsToMany(role_1.default, {
    through: userRole_1.default,
    as: 'roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});
role_1.default.belongsToMany(user_1.default, {
    through: userRole_1.default,
    as: 'users',
    foreignKey: 'roleId',
    otherKey: 'userId',
});
role_1.default.belongsToMany(permission_1.default, {
    through: 'role_permissions',
    as: 'permissions',
    foreignKey: 'roleId',
    otherKey: 'permissionId',
});
permission_1.default.belongsToMany(role_1.default, {
    through: 'role_permissions',
    as: 'roles',
    foreignKey: 'permissionId',
    otherKey: 'roleId',
});
equipment_1.default.belongsToMany(user_1.default, {
    through: 'userEquipements',
    foreignKey: 'equipmentId',
    as: 'assignedUser',
    otherKey: 'userId'
});
user_1.default.belongsToMany(equipment_1.default, {
    through: 'userEquipements',
    foreignKey: 'userId',
    as: 'equippedUser',
    otherKey: 'equipmentId'
});
event_1.default.belongsToMany(user_1.default, {
    through: 'event_attendees',
    as: 'attendees',
    foreignKey: 'eventId',
    otherKey: 'userId'
});
user_1.default.belongsToMany(event_1.default, {
    through: 'event_attendees',
    as: 'events',
    foreignKey: 'userId',
    otherKey: 'eventId'
});
user_1.default.belongsToMany(handover_1.default, {
    through: 'handovers_users',
    as: 'handovers',
    foreignKey: 'userId',
    otherKey: 'handoverId'
});
handover_1.default.belongsToMany(user_1.default, {
    through: 'handovers_users',
    as: 'users',
    foreignKey: 'handoverId',
    otherKey: 'userId'
});
card_1.default.belongsTo(user_1.default, { as: 'assignedUser', foreignKey: 'assignedTo' });
user_1.default.hasOne(card_1.default, { as: 'card', foreignKey: 'assignedTo' });
user_1.default.hasMany(appointment_1.default, { foreignKey: 'userId', as: 'appointments' });
appointment_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'user' });
user_1.default.hasMany(attendance_1.default, { foreignKey: 'userId', as: 'attendances' });
attendance_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'user' });
const db = {
    sequelize: database_1.default,
    User: user_1.default,
    Role: role_1.default,
    Permission: permission_1.default,
    UserRole: userRole_1.default,
    BlacklistedToken: blacklistedToken_1.default,
    Appointment: appointment_1.default,
    AttendEvent: event_1.default,
    Equipements: equipment_1.default,
    Handover: handover_1.default,
    Attendance: attendance_1.default,
    Card: card_1.default
};
exports.default = db;
//# sourceMappingURL=index.js.map