import { Controller } from "tsoa";
import { IUserAttributes } from "../types/user-type";
export interface UserCreateRequest {
    fullName: string;
    email?: string;
    password?: string;
    scannedId: string;
    phoneNumber?: string;
    status?: string;
    category?: string;
    badge?: string;
    role?: string;
    company?: string;
    department?: string;
    nationalId?: string;
}
export interface AttendanceInfo {
    id: string;
    userId: string;
    checkIn: Date;
    date: string;
    status: string;
}
export interface UserWithAttendanceResponse {
    success: boolean;
    message: string;
    result: {
        user: IUserAttributes | null;
        attendance: AttendanceInfo | null;
        isNewUser: boolean;
    } | null;
    statusCode: number;
}
export interface UserUpdateRequest {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
    department?: string;
    role?: string;
    category?: string;
    company?: string;
    status?: string;
}
export interface UserResponse {
    success: boolean;
    message: string;
    result: IUserAttributes | null;
    statusCode: number;
}
export interface UsersListResponse {
    success: boolean;
    message: string;
    result: IUserAttributes[] | null;
    statusCode: number;
}
export declare class UserController extends Controller {
    getAllUsers(): Promise<UsersListResponse>;
    getUserById(id: string): Promise<UserResponse>;
    createUser(userData: UserCreateRequest): Promise<UserWithAttendanceResponse>;
    updateUser(id: string, userData: UserUpdateRequest): Promise<UserResponse>;
    activateUser(id: string): Promise<UserResponse>;
    suspendUser(id: string): Promise<UserResponse>;
    deleteUser(id: string): Promise<UserResponse>;
}
