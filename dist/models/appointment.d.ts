import { Model, Optional } from "sequelize";
interface AppointmentAttributes {
    id: string;
    userId: string;
    purpose: string;
    host: string;
    status: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    department: string;
    appointmentDate: string;
    appointmentTime: string;
    timeDuration: string;
    appointmentLocation: string;
}
declare class Appointment extends Model<AppointmentAttributes, Optional<AppointmentAttributes, 'id'>> {
    id: string;
    userId: string;
    purpose?: string;
    host?: string;
    department?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    timeDuration?: string;
    appointmentLocation?: string;
    status?: 'pending' | 'confirmed' | 'canceled' | 'onhold' | 'completed';
    static associations: {
        users: any;
    };
}
export default Appointment;
