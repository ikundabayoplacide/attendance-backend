import { ServiceResponse } from "../utils/serviceResponse";
import { asyncCatch } from "../middlewares/errorHandler";
import { Body, Controller, Delete, Get, Patch, Path, Post, Put, Route, Security, Tags } from "tsoa";
import User from "../models/user";
import Attendance from "../models/attendance";
import { IUserAttributes } from "../types/user-type";
import { hash } from "bcrypt";

export interface UserCreateRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    status?: string;
    category?: string;
    role?: string;
    company?:string;
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
    category?:string;
    company?:string;
    status?:string
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

@Route('api/users')
@Tags('Users')
export class UserController extends Controller{
   @Security('jwt', ['user:list'])
    @Get('/')
    @asyncCatch
    public async getAllUsers():Promise<UsersListResponse>{
        const users=await User.findAll({order:[['fullName','ASC']]});
        return ServiceResponse.success('users retrieved successfully', users.map(u => u.toJSON() as IUserAttributes));
    }

    @Security('jwt', ['user:read'])
    @Get('/{id}')
    @asyncCatch
    public async getUserById(
        @Path() id: string):Promise<UserResponse>{
        const user=await User.findByPk(id);
        if(!user){
            return ServiceResponse.failure('user not found', null, 404);
        }
        return ServiceResponse.success('user retrieved successfully', user.toJSON() as IUserAttributes);
    }
    
    @Security('jwt',['user:create'])
    @Post('/')
    @asyncCatch
    public async createUser(
        @Body() userData: UserCreateRequest
    ): Promise<UserWithAttendanceResponse> {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        // Check if user already exists by email or nationalId
        const existingUser = await User.findOne({
            where: userData.nationalId
                ? { nationalId: userData.nationalId }
                : { email: userData.email }
        });

        let user: User;
        let isNewUser = false;

        if (!existingUser) {
            // First time - register user and record attendance
            const hashedPassword = await hash(userData.password, 12);
            user = await User.create({ ...userData, password: hashedPassword });
            isNewUser = true;
        } else {
            // Already registered - just record attendance
            user = existingUser;
        }

        // Always create attendance record
        const attendance = await Attendance.create({
            userId: user.id,
            checkIn: now,
            date: today,
            status: 'present',
        });

        return ServiceResponse.success(
            isNewUser ? 'User registered and attendance recorded' : 'Attendance recorded',
            {
                user: user.toJSON() as IUserAttributes,
                attendance: attendance.toJSON() as AttendanceInfo,
                isNewUser
            },
            isNewUser ? 201 : 200
        );
    }

    @Security('jwt', ['user:update'])
    @Put('/{id}')
    @asyncCatch
    public async updateUser(
        @Path() id:string,
        @Body() userData:UserUpdateRequest
    ):Promise<UserResponse>{
        const user=await User.findByPk(id);
        if(!user){
            return ServiceResponse.failure('user not found', null, 404);
        }
        await user.update(userData);
        return ServiceResponse.success('user updated successfully', user.toJSON() as IUserAttributes);
    }
    //active user
    @Security('jwt',['user:update'])
    @Put('/{id}/activate')
    @asyncCatch
    public async activateUser(
        @Path() id:string
    ):Promise<UserResponse>{
        const user=await User.findByPk(id);
        if(!user){
            return ServiceResponse.failure('User not found',null,404);
        }
        await user.update({status:'active'});
        return ServiceResponse.success('User activated successfully',user.toJSON()as IUserAttributes);
    }

    // controller for suspend user
    @Security('jwt',['user:update'])
    @Put('/{id}/suspend')
    @asyncCatch
    public async suspendUser(
        @Path() id:string
    ):Promise<UserResponse>{
        const user=await User.findByPk(id);
        if(!user){
            return ServiceResponse.failure('user not found',null,404);
        }
        await user.update({ status: 'suspended' });
        return ServiceResponse.success('user suspended successfully', user.toJSON() as IUserAttributes);
    }

    @Security('jwt', ['user:delete'])
    @Delete('/{id}/delete')
    @asyncCatch
    public async deleteUser(
        @Path() id:string
    ):Promise<UserResponse>{
         console.log('Delete endpoint hit with ID:', id);
        const user=await User.findByPk(id);
        if(!user){
            return ServiceResponse.failure('user not found', null, 404);
        }
        await user.destroy();
        return ServiceResponse.success('user deleted successfully', null);
    }
    
}