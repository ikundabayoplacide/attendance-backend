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
exports.HandoverController = exports.HandoverUpdateAttributes = exports.HandoverCreateAttributes = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const tsoa_1 = require("tsoa");
const handover_1 = __importDefault(require("../models/handover"));
class HandoverCreateAttributes {
}
exports.HandoverCreateAttributes = HandoverCreateAttributes;
class HandoverUpdateAttributes {
}
exports.HandoverUpdateAttributes = HandoverUpdateAttributes;
let HandoverController = class HandoverController extends tsoa_1.Controller {
    async getAllHandovers() {
        const handovers = await handover_1.default.findAll({ order: [['handOverDate', 'ASC']] });
        return serviceResponse_1.ServiceResponse.success('Handovers retrieved successfully', handovers.map((h) => h.toJSON()));
    }
    async getHandoverById(handoverId) {
        const handover = await handover_1.default.findByPk(handoverId);
        if (!handover) {
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('Handover retrieved successfully', handover.toJSON(), 200);
    }
    async createHandover(data) {
        const existingHandover = await handover_1.default.findOne({ where: { outgoingUser: data.outgoingUser, handOverDate: data.handOverDate, handOverShift: data.handOverShift } });
        if (existingHandover) {
            return serviceResponse_1.ServiceResponse.failure('Handover already exists', null, 409);
        }
        const createdhandover = await handover_1.default.create(data);
        return serviceResponse_1.ServiceResponse.success('Handover created successfully', createdhandover.toJSON(), 201);
    }
    async updateHandover(handoverId, data) {
        const handover = await handover_1.default.findByPk(handoverId);
        if (!handover) {
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        }
        await handover.update(data);
        return serviceResponse_1.ServiceResponse.success('Handover updated successfully', handover.toJSON());
    }
    //confirm handover
    async confirmHandleOver(handoverId) {
        const findHandover = await handover_1.default.findByPk(handoverId);
        if (!findHandover)
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        const result = await findHandover.update({ status: 'pending' });
        return serviceResponse_1.ServiceResponse.success('Handover confirmed successfully', result.toJSON(), 200);
    }
    //complete
    async completeHandleOver(handoverId) {
        const findHandover = await handover_1.default.findByPk(handoverId);
        if (!findHandover)
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        const result = await findHandover.update({ status: 'completed' });
        return serviceResponse_1.ServiceResponse.success('Handover completed successfully', result.toJSON(), 200);
    }
    //cancel
    async cancelHandleOver(handoverId) {
        const findHandover = await handover_1.default.findByPk(handoverId);
        if (!findHandover)
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        const result = await findHandover.update({ status: 'cancelled' });
        return serviceResponse_1.ServiceResponse.success('Handover cancelled successfully', result.toJSON(), 200);
    }
    async deleteHandover(handoverId) {
        const handover = await handover_1.default.findByPk(handoverId);
        if (!handover) {
            return serviceResponse_1.ServiceResponse.failure('Handover not found', null, 404);
        }
        await handover.destroy();
        return serviceResponse_1.ServiceResponse.success('Handover deleted successfully', null);
    }
};
exports.HandoverController = HandoverController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:read']),
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "getAllHandovers", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:read']),
    (0, tsoa_1.Get)('/{handoverId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "getHandoverById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:create']),
    (0, tsoa_1.Post)('/'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(409, 'Handover already exists'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HandoverCreateAttributes]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "createHandover", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:update']),
    (0, tsoa_1.Put)('/{handoverId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, HandoverUpdateAttributes]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "updateHandover", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:update']),
    (0, tsoa_1.Put)('/{handoverId}/confirm'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "confirmHandleOver", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:update']),
    (0, tsoa_1.Put)('/{handoverId}/complete'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "completeHandleOver", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:update']),
    (0, tsoa_1.Put)('/{handoverId}/cancel'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "cancelHandleOver", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['handover:delete']),
    (0, tsoa_1.Delete)('/{handoverId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Handover not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandoverController.prototype, "deleteHandover", null);
exports.HandoverController = HandoverController = __decorate([
    (0, tsoa_1.Route)('api/handover'),
    (0, tsoa_1.Tags)('HandOver')
], HandoverController);
//# sourceMappingURL=handover.js.map