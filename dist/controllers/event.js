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
exports.EventController = exports.EventUpdateRequest = exports.EventCreateRequest = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const tsoa_1 = require("tsoa");
const event_1 = __importDefault(require("../models/event"));
class EventCreateRequest {
}
exports.EventCreateRequest = EventCreateRequest;
class EventUpdateRequest {
}
exports.EventUpdateRequest = EventUpdateRequest;
let EventController = class EventController extends tsoa_1.Controller {
    async createEvent(data) {
        const Eventexist = await event_1.default.findOne({ where: { title: data.title } });
        if (Eventexist) {
            return serviceResponse_1.ServiceResponse.failure('Event already exist', null, 409);
        }
        else {
            const event = await event_1.default.create(data);
            return serviceResponse_1.ServiceResponse.success('Event created successfully', event, 201);
        }
    }
    async getAllEvents() {
        const events = await event_1.default.findAll({ order: [['createdAt', 'DESC']] });
        if (!events)
            return serviceResponse_1.ServiceResponse.failure('Events not found', events, 404);
        return serviceResponse_1.ServiceResponse.success('Events retrieved successfully', [], 200);
    }
    async getEventById(eventId) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        return serviceResponse_1.ServiceResponse.success('Event retrieved successfully', event, 200);
    }
    async updateEvent(eventId, data) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        await event.update(data);
        return serviceResponse_1.ServiceResponse.success('Event updated successfully', event, 200);
    }
    // we need to confirm
    async confirmEvent(eventId) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        await event.update({ status: 'confirmed' });
        return serviceResponse_1.ServiceResponse.success('Event confirmed successfully', event, 200);
    }
    // we need to cancel
    async cancelEvent(eventId) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        await event.update({ status: 'cancelled' });
        return serviceResponse_1.ServiceResponse.success('Event cancelled successfully', null, 200);
    }
    // we need complete event
    async makeCompletedEvent(eventId) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        await event.update({ status: 'completed' });
        return serviceResponse_1.ServiceResponse.success('Event completed successfully', null, 200);
    }
    async deleteEvent(eventId) {
        const event = await event_1.default.findByPk(eventId);
        if (!event)
            return serviceResponse_1.ServiceResponse.failure('Event not found', null, 404);
        await event.destroy();
        return serviceResponse_1.ServiceResponse.success('Event deleted successfully', null, 200);
    }
};
exports.EventController = EventController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:create']),
    (0, tsoa_1.Post)(),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventCreateRequest]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:read']),
    (0, tsoa_1.Get)(),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:read']),
    (0, tsoa_1.Get)('{eventId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Event not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:update']),
    (0, tsoa_1.Put)('{eventId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Event not found'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, EventUpdateRequest]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:update']),
    (0, tsoa_1.Put)('{eventId}/confirm'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Event not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "confirmEvent", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:update']),
    (0, tsoa_1.Put)('{eventId}/cancel'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "cancelEvent", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:update']),
    (0, tsoa_1.Put)('{eventId}/complete'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "makeCompletedEvent", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['event:delete']),
    (0, tsoa_1.Delete)('{eventId}'),
    errorHandler_1.asyncCatch,
    (0, tsoa_1.Response)(400, 'Bad Request'),
    (0, tsoa_1.Response)(404, 'Event not found'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, tsoa_1.Route)('api/events'),
    (0, tsoa_1.Tags)('Events')
], EventController);
//# sourceMappingURL=event.js.map