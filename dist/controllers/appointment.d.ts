import { ServiceResponse } from '../utils/serviceResponse';
import { Controller } from 'tsoa';
import { AppointmentResponse } from '../types/responses';
export interface AppointmentCreateAttributes {
    userId: string;
    purpose: string;
    host: string;
    status?: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    department: string;
    company: string;
    appointmentDate: string;
    appointmentTime: string;
    timeDuration: string;
    appointmentLocation: string;
}
export interface UpdateAppointmentAttributes {
    userId?: string;
    purpose?: string;
    status?: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    host?: string;
    department?: string;
    company?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    timeDuration?: string;
    appointmentLocation?: string;
}
export declare class appointmentController extends Controller {
    getAllAppointments(): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByUserId(userId: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByDate(date: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByDepartment(department: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByHost(host: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByTime(time: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentsByLocation(location: string): Promise<ServiceResponse<AppointmentResponse[]>>;
    getAppointmentById(id: string): Promise<ServiceResponse<AppointmentResponse | null>>;
    createAppointment(data: AppointmentCreateAttributes): Promise<ServiceResponse<AppointmentResponse | null>>;
    updateAppointment(id: string, data: UpdateAppointmentAttributes): Promise<ServiceResponse<AppointmentResponse | null>>;
    confirmAppointment(id: string): Promise<ServiceResponse<AppointmentResponse | null>>;
    cancelAppointment(id: string): Promise<ServiceResponse<AppointmentResponse | null>>;
    onholdAppointment(id: string): Promise<ServiceResponse<AppointmentResponse | null>>;
    completeAppointment(id: string): Promise<ServiceResponse<AppointmentResponse | null>>;
    deleteAppointment(id: string): Promise<ServiceResponse<null>>;
}
