import { Controller, TsoaResponse } from "@tsoa/runtime";
import { Request as ExpressRequest } from "express";
import { ServiceResponse } from "../utils/serviceResponse";
import { LoginRequest, SignupRequest } from "../types/auth-contoller-types";
import User from "../models/user";
import { IUserResponse } from "../types/user-controller-types";
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
export declare class AuthController extends Controller {
    private _buildUserResponse;
    login(credentials: LoginRequest, res: TsoaResponse<200 | 401 | 403, ServiceResponse<{
        user: IUserResponse | null;
    }>>): Promise<void>;
    getCurrentUser(req: ExpressRequest, res: TsoaResponse<200 | 401, ServiceResponse<{
        user: IUserResponse | null;
    }>>): Promise<void>;
    signup(signupData: SignupRequest, res: TsoaResponse<201 | 400 | 409, ServiceResponse<{
        user: IUserResponse | null;
        accessToken?: string;
        refreshToken?: string;
    }>>): Promise<void>;
    checkEmail(request: {
        email: string;
    }): Promise<ServiceResponse<{
        exists: boolean;
    }>>;
    refreshToken(request: {
        refreshToken: string;
    }, res: TsoaResponse<200 | 401, ServiceResponse<{
        accessToken: string;
        refreshToken: string;
    }>>): Promise<void>;
    private generateTokens;
    private generateToken;
    private blacklistToken;
    logout(req: ExpressRequest, res: TsoaResponse<200, ServiceResponse<null>>): Promise<void>;
}
