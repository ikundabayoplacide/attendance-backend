"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const sequelize_1 = require("sequelize");
const tsoa_1 = require("tsoa");
const attendance_1 = __importDefault(require("../models/attendance"));
const user_1 = __importDefault(require("../models/user"));
let AttendanceController = class AttendanceController extends tsoa_1.Controller {
    // Get all attendance records with user details
    async getAllAttendance() {
        const records = await attendance_1.default.findAll({
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }],
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Attendance records retrieved successfully', records.map(r => r.toJSON()));
    }
    // Get single attendance record by id
    async getAttendanceById(id) {
        const record = await attendance_1.default.findByPk(id, {
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }]
        });
        if (!record)
            return serviceResponse_1.ServiceResponse.failure('Attendance record not found', null, 404);
        return serviceResponse_1.ServiceResponse.success('Attendance record retrieved successfully', record.toJSON());
    }
    // Get attendance records by userId
    async getAttendanceByUserId(userId) {
        const records = await attendance_1.default.findAll({
            where: { userId },
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }],
            order: [['date', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Attendance records retrieved successfully', records.map(r => r.toJSON()));
    }
    // Get attendance records by date
    async getAttendanceByDate(date) {
        const records = await attendance_1.default.findAll({
            where: { date },
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }],
            order: [['checkIn', 'ASC']]
        });
        return serviceResponse_1.ServiceResponse.success('Attendance records retrieved successfully', records.map(r => r.toJSON()));
    }
    // Get attendance records by date range (for reports)
    async getAttendanceReport(startDate, endDate) {
        const records = await attendance_1.default.findAll({
            where: {
                date: { [sequelize_1.Op.between]: [startDate, endDate] }
            },
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }],
            order: [['date', 'ASC'], ['checkIn', 'ASC']]
        });
        return serviceResponse_1.ServiceResponse.success('Attendance report retrieved successfully', records.map(r => r.toJSON()));
    }
    // Get attendance report by userId and date range
    async getUserAttendanceReport(userId, startDate, endDate) {
        const records = await attendance_1.default.findAll({
            where: {
                userId,
                date: { [sequelize_1.Op.between]: [startDate, endDate] }
            },
            include: [{ model: user_1.default, as: 'user', attributes: ['fullName', 'email', 'department', 'nationalId', 'category'] }],
            order: [['date', 'ASC']]
        });
        return serviceResponse_1.ServiceResponse.success('User attendance report retrieved successfully', records.map(r => r.toJSON()));
    }
    // Checkout - record when user leaves
    async checkOut(id, data) {
        const record = await attendance_1.default.findByPk(id);
        if (!record)
            return serviceResponse_1.ServiceResponse.failure('Attendance record not found', null, 404);
        if (record.checkOut)
            return serviceResponse_1.ServiceResponse.failure('User already checked out', null, 400);
        await record.update({ checkOut: new Date(), ...data });
        return serviceResponse_1.ServiceResponse.success('Checkout recorded successfully', record.toJSON());
    }
    // Update attendance record
    async updateAttendance(id, data) {
        const record = await attendance_1.default.findByPk(id);
        if (!record)
            return serviceResponse_1.ServiceResponse.failure('Attendance record not found', null, 404);
        await record.update(data);
        return serviceResponse_1.ServiceResponse.success('Attendance record updated successfully', record.toJSON());
    }
    // Delete attendance record
    async deleteAttendance(id) {
        const record = await attendance_1.default.findByPk(id);
        if (!record)
            return serviceResponse_1.ServiceResponse.failure('Attendance record not found', null, 404);
        await record.destroy();
        return serviceResponse_1.ServiceResponse.success('Attendance record deleted successfully', null);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAllAttendance", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/by-user/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceByUserId", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/by-date/{date}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceByDate", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/report/range/{startDate}/{endDate}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceReport", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:read']),
    (0, tsoa_1.Get)('/report/user/{userId}/{startDate}/{endDate}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getUserAttendanceReport", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:update']),
    (0, tsoa_1.Put)('/{id}/checkout'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkOut", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:update']),
    (0, tsoa_1.Put)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "updateAttendance", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['attendance:delete']),
    (0, tsoa_1.Delete)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "deleteAttendance", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, tsoa_1.Route)('api/attendance'),
    (0, tsoa_1.Tags)('Attendance')
], AttendanceController);
//# sourceMappingURL=attendance.js.map