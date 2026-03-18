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
exports.PermissionController = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const sequelize_1 = require("sequelize");
const tsoa_1 = require("tsoa");
const permission_1 = __importDefault(require("../models/permission"));
let PermissionController = class PermissionController extends tsoa_1.Controller {
    async getAllPermissions() {
        const permissions = await permission_1.default.findAll({
            order: [['name', 'ASC']]
        });
        return serviceResponse_1.ServiceResponse.success('Permissions retrieved successfully', permissions, 200);
    }
    async getPermissionById(permissionId) {
        const permission = await permission_1.default.findByPk(permissionId);
        if (!permission) {
            return serviceResponse_1.ServiceResponse.failure('Permission not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('Permission retrieved successfully', permission, 200);
    }
    async createPermission(data) {
        // Check if a permission with the same name already exists
        const existingPermission = await permission_1.default.findOne({ where: { name: data.name } });
        if (existingPermission) {
            return serviceResponse_1.ServiceResponse.failure('Permission already exists', null, 409);
        }
        const created = await permission_1.default.create({
            name: data.name,
            description: data.description || null
        });
        this.setStatus(201);
        return serviceResponse_1.ServiceResponse.success('Permission created successfully', created, 201);
    }
    async updatePermission(permissionId, data) {
        const permission = await permission_1.default.findByPk(permissionId);
        if (!permission) {
            return serviceResponse_1.ServiceResponse.failure('Permission not found', null, 404);
        }
        // Check if another permission with the same name already exists
        if (data.name) {
            const existingPermission = await permission_1.default.findOne({
                where: {
                    name: data.name,
                    id: { [sequelize_1.Op.ne]: permissionId } // Exclude current permission from the check
                }
            });
            if (existingPermission) {
                return serviceResponse_1.ServiceResponse.failure('A permission with this name already exists', null, 409);
            }
        }
        await permission.update({
            name: data.name || permission.name,
            description: data.description !== undefined ? data.description : permission.description
        });
        return serviceResponse_1.ServiceResponse.success('Permission updated successfully', permission, 200);
    }
    async deletePermission(permissionId) {
        const permission = await permission_1.default.findByPk(permissionId);
        if (!permission) {
            return serviceResponse_1.ServiceResponse.failure('Permission not found', null, 404);
        }
        //check if the permission is assigned to any role
        const roleCount = await permission.countRoles();
        if (roleCount > 0) {
            return serviceResponse_1.ServiceResponse.failure('Cannot delete permission that is assigned to roles', null, 409);
        }
        await permission.destroy();
        return serviceResponse_1.ServiceResponse.success('Permission deleted successfully', null, 200);
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getAllPermissions", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['permission:read']),
    (0, tsoa_1.Get)('/:permissionId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Permission not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissionById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['permission:create']),
    (0, tsoa_1.Post)('/'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(409, 'Permission already exists'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "createPermission", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['permission:update']),
    (0, tsoa_1.Put)('/:permissionId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Permission not found'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "updatePermission", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['permission:delete']),
    (0, tsoa_1.Delete)('/:permissionId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Permission not found'),
    (0, tsoa_1.Response)(409, 'cannot delete permission that is assigned to roles'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "deletePermission", null);
exports.PermissionController = PermissionController = __decorate([
    (0, tsoa_1.Route)('api/permissions'),
    (0, tsoa_1.Tags)('Permissions')
], PermissionController);
//# sourceMappingURL=permission.js.map