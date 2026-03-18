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
exports.UserController = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const tsoa_1 = require("tsoa");
const user_1 = __importDefault(require("../models/user"));
const attendance_1 = __importDefault(require("../models/attendance"));
const bcryptjs_1 = require("bcryptjs");
let UserController = class UserController extends tsoa_1.Controller {
    async getAllUsers() {
        const users = await user_1.default.findAll({ order: [['fullName', 'ASC']] });
        return serviceResponse_1.ServiceResponse.success('users retrieved successfully', users.map(u => u.toJSON()));
    }
    async getUserById(id) {
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return serviceResponse_1.ServiceResponse.failure('user not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('user retrieved successfully', user.toJSON());
    }
    async createUser(userData) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        // Check if user already exists by nationalId or scannedId
        const whereClause = {};
        if (userData.nationalId)
            whereClause.nationalId = userData.nationalId;
        else if (userData.scannedId)
            whereClause.scannedId = userData.scannedId;
        const existingUser = whereClause.nationalId || whereClause.scannedId
            ? await user_1.default.findOne({ where: whereClause })
            : null;
        let user;
        let isNewUser = false;
        if (!existingUser) {
            // First time - register user and record attendance
            const hashedPassword = userData.password ? await (0, bcryptjs_1.hash)(userData.password, 12) : undefined;
            user = await user_1.default.create({ ...userData, password: hashedPassword });
            isNewUser = true;
        }
        else {
            // Already registered - just record attendance
            user = existingUser;
        }
        // Always create attendance record
        const attendance = await attendance_1.default.create({
            userId: user.id,
            checkIn: now,
            date: today,
            status: 'present',
            hoster: userData.email,
            badge: userData.badge || ''
        });
        return serviceResponse_1.ServiceResponse.success(isNewUser ? 'User registered and attendance recorded' : 'Attendance recorded', {
            user: user.toJSON(),
            attendance: attendance.toJSON(),
            isNewUser
        }, isNewUser ? 201 : 200);
    }
    async updateUser(id, userData) {
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return serviceResponse_1.ServiceResponse.failure('user not found', null, 404);
        }
        await user.update(userData);
        return serviceResponse_1.ServiceResponse.success('user updated successfully', user.toJSON());
    }
    //active user
    async activateUser(id) {
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return serviceResponse_1.ServiceResponse.failure('User not found', null, 404);
        }
        await user.update({ status: 'active' });
        return serviceResponse_1.ServiceResponse.success('User activated successfully', user.toJSON());
    }
    // controller for suspend user
    async suspendUser(id) {
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return serviceResponse_1.ServiceResponse.failure('user not found', null, 404);
        }
        await user.update({ status: 'suspended' });
        return serviceResponse_1.ServiceResponse.success('user suspended successfully', user.toJSON());
    }
    async deleteUser(id) {
        console.log('Delete endpoint hit with ID:', id);
        const user = await user_1.default.findByPk(id);
        if (!user) {
            return serviceResponse_1.ServiceResponse.failure('user not found', null, 404);
        }
        await user.destroy();
        return serviceResponse_1.ServiceResponse.success('user deleted successfully', null);
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:list']),
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:read']),
    (0, tsoa_1.Get)('/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:create']),
    (0, tsoa_1.Post)('/'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:update']),
    (0, tsoa_1.Put)('/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:update']),
    (0, tsoa_1.Put)('/{id}/activate'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:update']),
    (0, tsoa_1.Put)('/{id}/suspend'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "suspendUser", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['user:delete']),
    (0, tsoa_1.Delete)('/{id}/delete'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('api/users'),
    (0, tsoa_1.Tags)('Users')
], UserController);
//# sourceMappingURL=user.js.map