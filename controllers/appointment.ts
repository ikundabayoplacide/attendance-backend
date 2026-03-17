import { ServiceResponse } from '../utils/serviceResponse';
import { asyncCatch } from '../middlewares/errorHandler';
import { Op } from 'sequelize';
import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags } from 'tsoa';
import { AppointmentResponse } from '../types/responses';
import Appointment from '../models/appointment';

export interface AppointmentCreateAttributes {
    userId: string;
    purpose: string;
    host: string;
    status?: 'pending'|'confirmed'|'canceled'|'onhold'|'completed';
    department: string;
    company:string;
    appointmentDate: string;
    appointmentTime: string;
    timeDuration: string;
    appointmentLocation: string;
}

export interface UpdateAppointmentAttributes {
    userId?: string;
    purpose?: string;
    status?: 'pending'|'confirmed'|'canceled'|'onhold'|'completed'
    host?: string;
    department?: string;
    company?:string;
    appointmentDate?: string;
    appointmentTime?: string;
    timeDuration?: string;
    appointmentLocation?: string;
}

@Route('api/appointments')
@Tags('Appointments')
export class appointmentController extends Controller {
    @Security('jwt', ['appointment:read'])
    @Get('/')
    @asyncCatch
    public async getAllAppointments(): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({ order: [['createdAt', 'DESC']] });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    // Get appointments by user ID
    @Security('jwt', ['appointment:read'])
    @Get('/user/:userId')
    @asyncCatch
    public async getAppointmentsByUserId(@Path() userId: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                userId: userId
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //Get appointments by date
    @Security('jwt', ['appointment:read'])
    @Get('/date/:date')
    @asyncCatch
    public async getAppointmentsByDate(@Path() date: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                appointmentDate: date
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //get appointments by department
    @Security('jwt', ['appointment:read'])
    @Get('/department/:department')
    @asyncCatch
    public async getAppointmentsByDepartment(@Path() department: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                department: {
                    [Op.iLike]: `%${department}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //Get appointments by host
    @Security('jwt', ['appointment:read'])
    @Get('/host/:host')
    @asyncCatch
    public async getAppointmentsByHost(@Path() host: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                host: {
                    [Op.iLike]: `%${host}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //get appointments by time
    @Security('jwt', ['appointment:read'])
    @Get('/time/:time')
    @asyncCatch
    public async getAppointmentsByTime(@Path() time: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                appointmentTime: time
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //Get appointment by Location
    @Security('jwt', ['appointment:read'])
    @Get('/location/:location')
    @asyncCatch
    public async getAppointmentsByLocation(@Path() location: string): Promise<ServiceResponse<AppointmentResponse[]>> {
        const appointments = await Appointment.findAll({
            where: {
                appointmentLocation: {
                    [Op.iLike]: `%${location}%`
                }
            },
            order: [['createdAt', 'DESC']]
        });
        return ServiceResponse.success('Appointments retrieved successfully', appointments, 200);
    }

    //Get appointment by its Id
    @Security('jwt', ['appointment:read'])
    @Get('/:id')
    @asyncCatch
    public async getAppointmentById(@Path() id: string): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        return ServiceResponse.success('Appointment retrieved successfully', appointment, 200);
    }
 // create appointment
    @Security('jwt', ['appointment:create'])
    @Post('/create')
    @asyncCatch
    public async createAppointment(@Body() data: AppointmentCreateAttributes): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.create({
            ...data,
            status: data.status ?? 'pending'
        });
        return ServiceResponse.success('Appointment created successfully', appointment, 201);
    }

    //update appointment 
    @Security('jwt',['appointment:update'])
    @Put('/{id}/update')
    @asyncCatch
    public async updateAppointment(
        @Path() id: string,
        @Body() data: UpdateAppointmentAttributes
    ): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update(data);
        return ServiceResponse.success('Appointment updated successfully', appointment, 200);
    }
    //confim appointment
    @Security('jwt', ['appointment:update'])
    @Put('/confirm/{id}')
    @asyncCatch
    public async confirmAppointment(
        @Path() id: string
    ): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'confirmed' });
        return ServiceResponse.success('Appointment confirmed successfully', appointment, 200);
    }

    //cancel appointment
    @Security('jwt', ['appointment:update'])
    @Put('/cancel/{id}')
    @asyncCatch
    public async cancelAppointment(
        @Path() id: string
    ): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'canceled' });
        return ServiceResponse.success('Appointment canceled successfully', appointment, 200);
    }

    //onhold appointment
    @Security('jwt', ['appointment:update'])
    @Put('/onhold/{id}')
    @asyncCatch
    public async onholdAppointment(
        @Path() id: string
    ): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'onhold' });
        return ServiceResponse.success('Appointment put on hold successfully', appointment, 200);
    }

    //complete appointment
    @Security('jwt', ['appointment:update'])
    @Put('/complete/{id}')
    @asyncCatch
    public async completeAppointment(
        @Path() id: string
    ): Promise<ServiceResponse<AppointmentResponse | null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.update({ status: 'completed' });
        return ServiceResponse.success('Appointment completed successfully', appointment, 200);
    }

    //delete appointment
    @Security('jwt', ['appointment:delete'])
    @Delete('/{id}')
    @asyncCatch
    public async deleteAppointment(
        @Path() id: string
    ): Promise<ServiceResponse<null>> {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return ServiceResponse.failure('Appointment not found', null, 404);
        }
        await appointment.destroy();
        return ServiceResponse.success('Appointment deleted successfully', null, 200);
    }
}


