import { Model, Optional } from "sequelize";
interface IAttendanceAttributes {
    id: string;
    userId: string;
    checkIn: Date;
    checkOut?: Date;
    hoster: string;
    badge: string;
    date: string;
    status: 'present' | 'late' | 'left_early' | 'absent';
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare class Attendance extends Model<IAttendanceAttributes, Optional<IAttendanceAttributes, 'id' | 'checkOut' | 'hoster' | 'badge' | 'note' | 'createdAt' | 'updatedAt'>> implements IAttendanceAttributes {
    id: string;
    userId: string;
    checkIn: Date;
    checkOut?: Date;
    hoster: string;
    badge: string;
    date: string;
    status: 'present' | 'late' | 'left_early' | 'absent';
    note?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export default Attendance;
