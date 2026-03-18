import { Model, Optional } from "sequelize";
interface IeventAttributes {
    id: string;
    title: string;
    description?: string | null;
    hoster?: string;
    eventDate?: string;
    eventTime?: string;
    expectedAttendees?: string;
    timeDuration?: string;
    eventLocation?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string | undefined;
}
interface IeventCreationAttributes extends Optional<IeventAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
declare class AttendEvent extends Model<IeventAttributes, IeventCreationAttributes> implements IeventAttributes {
    id: string;
    title: string;
    description: string;
    hoster?: string | undefined;
    eventDate: string;
    eventTime: string;
    expectedAttendees: string;
    timeDuration: string;
    eventLocation: string;
    status?: string | undefined;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default AttendEvent;
