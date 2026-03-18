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
exports.RoleController = void 0;
const tsoa_1 = require("tsoa");
const errorHandler_1 = require("../middlewares/errorHandler");
const serviceResponse_1 = require("../utils/serviceResponse");
const sequelize_1 = require("sequelize");
const role_1 = __importDefault(require("../models/role"));
const permission_1 = __importDefault(require("../models/permission"));
let RoleController = class RoleController extends tsoa_1.Controller {
    async listRoles(page, limit, search) {
        const where = {};
        // Add search functionality using Sequelize operators
        if (search && search.trim()) {
            const searchTerm = search.trim();
            where[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                { description: { [sequelize_1.Op.like]: `%${searchTerm}%` } },
                { category: { [sequelize_1.Op.like]: `%${searchTerm}%` } }
            ];
        }
        //Filter by category if provided
        if (search && search.trim()) {
            const categoryTerm = search.trim();
            where.category = { [sequelize_1.Op.like]: `%${categoryTerm}%` };
        }
        const offset = (page - 1) * limit;
        const { count, rows } = await role_1.default.findAndCountAll({
            where,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: ['permissions'] // Include associated permissions
        });
        return serviceResponse_1.ServiceResponse.success('Roles retrieved successfully', {
            roles: rows,
            pagination: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit)
            }
        }, 200);
    }
    // The sigle role retrieval, creation, update and deletion endpoints would go here, following a similar pattern to the permissions controller
    async getRoleById(roleId) {
        const role = await role_1.default.findByPk(roleId, {
            include: [{
                    model: permission_1.default,
                    as: 'permissions',
                    through: {
                        attributes: [] // Exclude the join table attributes
                    }
                }]
        });
        if (!role) {
            return serviceResponse_1.ServiceResponse.failure('Role not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('Role retrieved successfully', role, 200);
    }
    async createRole(data) {
        const createdRole = await role_1.default.create({
            name: data.name,
            description: data.description || null,
            category: data.category || null
        });
        if (data.permissionIds && data.permissionIds.length > 0) {
            await createdRole.setPermissions(data.permissionIds);
        }
        this.setStatus(201);
        const result = await role_1.default.findByPk(createdRole.id, {
            include: [{
                    model: permission_1.default,
                    as: 'permissions',
                    through: {
                        attributes: []
                    }
                }]
        });
        return serviceResponse_1.ServiceResponse.success('Role created successfully', result, 201);
    }
    // updating role and its permissions
    async updateRole(roleId, data) {
        const role = await role_1.default.findByPk(roleId);
        if (!role) {
            return serviceResponse_1.ServiceResponse.failure('Role not found', null, 404);
        }
        await role.update({
            name: data.name || role.name,
            description: data.description !== undefined ? data.description : role.description,
            category: data.category !== undefined ? data.category : role.category
        });
        // Handle both permissionIds and permissions array
        const permissionIds = data.permissionIds ||
            (Array.isArray(data.permissions)
                ? (typeof data.permissions[0] === 'string'
                    ? data.permissions
                    : data.permissions.map((p) => p.id).filter(Boolean))
                : undefined);
        if (permissionIds !== undefined) {
            await role.setPermissions(permissionIds);
        }
        const result = await role_1.default.findByPk(roleId, {
            include: [{
                    model: permission_1.default,
                    as: 'permissions',
                    through: {
                        attributes: []
                    }
                }]
        });
        return serviceResponse_1.ServiceResponse.success('Role updated successfully', result, 200);
    }
    // deleting role
    async deleteRole(roleId) {
        const role = await role_1.default.findByPk(roleId);
        if (!role) {
            return serviceResponse_1.ServiceResponse.failure('Role not found', null, 404);
        }
        await role.destroy();
        this.setStatus(204);
        return serviceResponse_1.ServiceResponse.success('Role deleted successfully', null, 204);
    }
    // deleting permissions of a role
    async removePermissionFromRole(roleId, permissionId) {
        const role = await role_1.default.findByPk(roleId);
        const permission = await permission_1.default.findByPk(permissionId);
        if (!role || !permission) {
            return serviceResponse_1.ServiceResponse.failure('Role or Permission not found', null, 404);
        }
        await role.removePermission(permission);
        this.setStatus(204);
        return serviceResponse_1.ServiceResponse.success('Permission removed from role successfully', null, 204);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:read']),
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "listRoles", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:read']),
    (0, tsoa_1.Get)('/:roleId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Role not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:create']),
    (0, tsoa_1.Post)('/'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:update']),
    (0, tsoa_1.Put)('/:roleId'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:delete']),
    (0, tsoa_1.Delete)('/:roleId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.SuccessResponse)(204, 'No Content'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['role:update']),
    (0, tsoa_1.Delete)('/:roleId/permissions/:permissionId'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.SuccessResponse)(204, 'No Content'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "removePermissionFromRole", null);
exports.RoleController = RoleController = __decorate([
    (0, tsoa_1.Route)('/api/roles'),
    (0, tsoa_1.Tags)('Roles')
], RoleController);
//# sourceMappingURL=role.js.map