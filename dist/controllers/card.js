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
exports.CardController = void 0;
const tsoa_1 = require("tsoa");
const card_1 = __importDefault(require("../models/card"));
const serviceResponse_1 = require("../utils/serviceResponse");
let CardController = class CardController extends tsoa_1.Controller {
    //get all cards
    async getAllCards() {
        const cards = await card_1.default.findAll({ order: [['createdAt', 'DESC']] });
        return serviceResponse_1.ServiceResponse.success('Cards retrieved successfully', cards.map(c => c.toJSON()));
    }
    //create card
    async createCard(body) {
        const card = await card_1.default.create(body);
        return serviceResponse_1.ServiceResponse.success('Card created successfully', card.toJSON(), 201);
    }
    //get single card
    async getCard(id) {
        const card = await card_1.default.findByPk(id);
        if (!card)
            return serviceResponse_1.ServiceResponse.failure('Card not found', null, 404);
        return serviceResponse_1.ServiceResponse.success('Card retrieved successfully', card.toJSON());
    }
    //assign card to user
    async assignCard(id, body) {
        const card = await card_1.default.findByPk(id);
        if (!card)
            return serviceResponse_1.ServiceResponse.failure('Card not found', null, 404);
        await card.update({ assignedTo: body.userId });
        return serviceResponse_1.ServiceResponse.success('Card assigned successfully', card.toJSON());
    }
    // update card
    async updateCard(id, body) {
        const card = await card_1.default.findByPk(id);
        if (!card)
            return serviceResponse_1.ServiceResponse.failure('Card not found', null, 404);
        await card.update(body);
        return serviceResponse_1.ServiceResponse.success('Card updated successfully', card.toJSON());
    }
    // delete card
    async deleteCard(id) {
        const card = await card_1.default.findByPk(id);
        if (!card)
            return serviceResponse_1.ServiceResponse.failure('Card not found', null, 404);
        await card.destroy();
        return serviceResponse_1.ServiceResponse.success('Card deleted successfully', null);
    }
};
exports.CardController = CardController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:read']),
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getAllCards", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:create']),
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCard", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:read']),
    (0, tsoa_1.Get)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getCard", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:assign']),
    (0, tsoa_1.Put)('/assign/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "assignCard", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:update']),
    (0, tsoa_1.Put)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "updateCard", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['card:delete']),
    (0, tsoa_1.Delete)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "deleteCard", null);
exports.CardController = CardController = __decorate([
    (0, tsoa_1.Route)('api/cards'),
    (0, tsoa_1.Tags)('Cards')
], CardController);
//# sourceMappingURL=card.js.map