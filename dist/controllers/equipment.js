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
exports.EquipementController = exports.EquipementUpdateAttributes = exports.EquipementCreateAttributes = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const tsoa_1 = require("tsoa");
const equipment_1 = __importDefault(require("../models/equipment"));
class EquipementCreateAttributes {
}
exports.EquipementCreateAttributes = EquipementCreateAttributes;
class EquipementUpdateAttributes {
}
exports.EquipementUpdateAttributes = EquipementUpdateAttributes;
let EquipementController = class EquipementController extends tsoa_1.Controller {
    async getAllEquipements() {
        const equipements = await equipment_1.default.findAll({ order: [['name', 'ASC']] });
        return serviceResponse_1.ServiceResponse.success('Equipements retrieved successfully', equipements.map((e) => e.toJSON()));
    }
    async getEquipementById(equipementId) {
        const equipement = await equipment_1.default.findByPk(equipementId);
        if (!equipement) {
            return serviceResponse_1.ServiceResponse.failure('Equipement not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('Equipement retrieved successfully', equipement.toJSON());
    }
    async createEquipement(data) {
        const existingEquipement = await equipment_1.default.findOne({ where: { name: data.name } });
        if (existingEquipement) {
            return serviceResponse_1.ServiceResponse.failure('Equipement already exists', null, 409);
        }
        const created = await equipment_1.default.create({ ...data, serialNumber: data.serialNumber ?? null });
        return serviceResponse_1.ServiceResponse.success('Equipement created successfully', created.toJSON(), 201);
    }
    async updateEquipement(equipementId, data) {
        const equipement = await equipment_1.default.findByPk(equipementId);
        if (!equipement) {
            return serviceResponse_1.ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.update(data);
        return serviceResponse_1.ServiceResponse.success('Equipement updated successfully', equipement.toJSON());
    }
    // Assign Equipement to user
    async assignEquipement(equipementId, data) {
        const equipement = await equipment_1.default.findByPk(equipementId);
        if (!equipement) {
            return serviceResponse_1.ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.update({ assignedTo: data.userId, status: 'inuse' });
        return serviceResponse_1.ServiceResponse.success('Equipement assigned successfully', equipement.toJSON());
    }
    async deleteEquipement(equipementId) {
        const equipement = await equipment_1.default.findByPk(equipementId);
        if (!equipement) {
            return serviceResponse_1.ServiceResponse.failure('Equipement not found', null, 404);
        }
        await equipement.destroy();
        return serviceResponse_1.ServiceResponse.success('Equipement deleted successfully', null);
    }
};
exports.EquipementController = EquipementController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:read']),
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Equipements not found'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "getAllEquipements", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:read']),
    (0, tsoa_1.Get)('/{equipementId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Equipement not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "getEquipementById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:create']),
    (0, tsoa_1.Post)('/'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(409, 'Equipement already exists'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EquipementCreateAttributes]),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "createEquipement", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:update']),
    (0, tsoa_1.Put)('/{equipementId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Equipement not found'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, EquipementUpdateAttributes]),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "updateEquipement", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:update']),
    (0, tsoa_1.Put)('/{equipementId}/assign'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Equipement not found'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "assignEquipement", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['equipement:delete']),
    (0, tsoa_1.Delete)('/{equipementId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Equipement not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipementController.prototype, "deleteEquipement", null);
exports.EquipementController = EquipementController = __decorate([
    (0, tsoa_1.Route)('api/equipements'),
    (0, tsoa_1.Tags)('Equipements')
], EquipementController);
//# sourceMappingURL=equipment.js.map