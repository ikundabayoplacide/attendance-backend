import type { ErrorRequestHandler, RequestHandler } from "express";
export declare class ErrorHandler extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
    static BadRequest(message: string): ErrorHandler;
    static NotFound(message: string): ErrorHandler;
    static Forbidden(message: string): ErrorHandler;
    static InternalServerError(message?: string): ErrorHandler;
}
export declare function asyncCatch(_target: any, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export default function errorHandlerMiddleware(): [RequestHandler, ErrorRequestHandler, ErrorRequestHandler];
