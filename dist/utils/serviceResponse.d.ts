import type { Response } from "express";
export interface IServiceResponse<T = any> {
    success: boolean;
    message: string;
    result: T | null;
    statusCode: number;
    [key: string]: any;
}
export declare class ServiceResponse<T = any, E = Record<string, unknown>> implements IServiceResponse<T> {
    success: boolean;
    message: string;
    result: T | null;
    statusCode: number;
    [key: string]: any;
    private constructor();
    static success<T>(message?: string, result?: T | null, statusCode?: number, customFields?: Record<string, any>): ServiceResponse<T>;
    static successWithExtra<T, E>(message: string, result: T | null, extra: E, statusCode?: number): ServiceResponse<T, E>;
    static failure<T>(message?: string, result?: T | null, statusCode?: number, customFields?: Record<string, any>): ServiceResponse<T>;
    static send<T>(response: Response, serviceResponse: ServiceResponse<T>): Response;
}
