import { Controller } from 'tsoa';
export interface AttendanceResponse {
    id: string;
    userId: string;
    checkIn: Date;
    checkOut?: Date;
    hoster?: string;
    badge?: string;
    date: string;
    status: string;
    note?: string;
    user?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AttendanceListResponse {
    success: boolean;
    message: string;
    result: AttendanceResponse[] | null;
    statusCode: number;
}
export interface AttendanceSingleResponse {
    success: boolean;
    message: string;
    result: AttendanceResponse | null;
    statusCode: number;
}
export interface CheckOutRequest {
    note?: string;
}
export interface UpdateAttendanceRequest {
    status?: 'present' | 'late' | 'left_early' | 'absent';
    note?: string;
    checkOut?: Date;
    checkIn?: Date;
}
export declare class AttendanceController extends Controller {
    getAllAttendance(): Promise<AttendanceListResponse>;
    getAttendanceById(id: string): Promise<AttendanceSingleResponse>;
    getAttendanceByUserId(userId: string): Promise<AttendanceListResponse>;
    getAttendanceByDate(date: string): Promise<AttendanceListResponse>;
    getAttendanceReport(startDate: string, endDate: string): Promise<AttendanceListResponse>;
    getUserAttendanceReport(userId: string, startDate: string, endDate: string): Promise<AttendanceListResponse>;
    checkOut(id: string, data: CheckOutRequest): Promise<AttendanceSingleResponse>;
    updateAttendance(id: string, data: UpdateAttendanceRequest): Promise<AttendanceSingleResponse>;
    deleteAttendance(id: string): Promise<AttendanceSingleResponse>;
}
