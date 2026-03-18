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
exports.appointmentController = void 0;
const serviceResponse_1 = require("../utils/serviceResponse");
const errorHandler_1 = require("../middlewares/errorHandler");
const sequelize_1 = require("sequelize");
const tsoa_1 = require("tsoa");
const appointment_1 = __importDefault(require("../models/appointment"));
let appointmentController = class appointmentController extends tsoa_1.Controller {
    async getAllAppointments() {
        const appointments = await appointment_1.default.findAll({ order: [['createdAt', 'DESC']] });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    // Get appointments by user ID
    async getAppointmentsByUserId(userId) {
        const appointments = await appointment_1.default.findAll({
            where: {
                userId: userId
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //Get appointments by date
    async getAppointmentsByDate(date) {
        const appointments = await appointment_1.default.findAll({
            where: {
                appointmentDate: date
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //get appointments by department
    async getAppointmentsByDepartment(department) {
        const appointments = await appointment_1.default.findAll({
            where: {
                department: {
                    [sequelize_1.Op.iLike]: `%${department}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //Get appointments by host
    async getAppointmentsByHost(host) {
        const appointments = await appointment_1.default.findAll({
            where: {
                host: {
                    [sequelize_1.Op.iLike]: `%${host}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //get appointments by time
    async getAppointmentsByTime(time) {
        const appointments = await appointment_1.default.findAll({
            where: {
                appointmentTime: time
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //Get appointment by Location
    async getAppointmentsByLocation(location) {
        const appointments = await appointment_1.default.findAll({
            where: {
                appointmentLocation: {
                    [sequelize_1.Op.iLike]: `%${location}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return serviceResponse_1.ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }
    //Get appointment by its Id
    async getAppointmentById(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        return serviceResponse_1.ServiceResponse.success('Appointment retrieved successfully', appointment, 200);
    }
    // create appointment
    async createAppointment(data) {
        const appointment = await appointment_1.default.create({
            ...data,
            status: data.status ?? 'pending'
        });
        return serviceResponse_1.ServiceResponse.success('Appointment created successfully', appointment, 201);
    }
    //update appointment 
    async updateAppointment(id, data) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update(data);
        return serviceResponse_1.ServiceResponse.success('Appointment updated successfully', appointment, 200);
    }
    //confim appointment
    async confirmAppointment(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'confirmed' });
        return serviceResponse_1.ServiceResponse.success('Appointment confirmed successfully', appointment, 200);
    }
    //cancel appointment
    async cancelAppointment(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'canceled' });
        return serviceResponse_1.ServiceResponse.success('Appointment canceled successfully', appointment, 200);
    }
    //onhold appointment
    async onholdAppointment(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'onhold' });
        return serviceResponse_1.ServiceResponse.success('Appointment put on hold successfully', appointment, 200);
    }
    //complete appointment
    async completeAppointment(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'completed' });
        return serviceResponse_1.ServiceResponse.success('Appointment completed successfully', appointment, 200);
    }
    //delete appointment
    async deleteAppointment(id) {
        const appointment = await appointment_1.default.findByPk(id);
        if (!appointment) {
            return serviceResponse_1.ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.destroy();
        return serviceResponse_1.ServiceResponse.success('Appointment deleted successfully', null, 200);
    }
};
exports.appointmentController = appointmentController;
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/'),
    errorHandler_1.asyncCatch,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAllAppointments", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/user/:userId'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByUserId", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/date/:date'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByDate", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/department/:department'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByDepartment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/host/:host'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByHost", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/time/:time'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByTime", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/location/:location'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentsByLocation", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:read']),
    (0, tsoa_1.Get)('/:id'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "getAppointmentById", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:create']),
    (0, tsoa_1.Post)('/create'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "createAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:update']),
    (0, tsoa_1.Put)('/{id}/update'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "updateAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:update']),
    (0, tsoa_1.Put)('/confirm/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "confirmAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:update']),
    (0, tsoa_1.Put)('/cancel/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "cancelAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:update']),
    (0, tsoa_1.Put)('/onhold/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "onholdAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:update']),
    (0, tsoa_1.Put)('/complete/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "completeAppointment", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['appointment:delete']),
    (0, tsoa_1.Delete)('/{id}'),
    errorHandler_1.asyncCatch,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], appointmentController.prototype, "deleteAppointment", null);
exports.appointmentController = appointmentController = __decorate([
    (0, tsoa_1.Route)('api/appointments'),
    (0, tsoa_1.Tags)('Appointments')
], appointmentController);
//# sourceMappingURL=appointment.js.map