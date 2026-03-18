import { Request, Response, NextFunction } from "express";
export declare function expressAuthentication(request: Request, securityName: string, scopes?: string[]): Promise<any>;
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkOptionalAuth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkPermission: (requiredPermission: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const checkOptionalPermission: (requiredPermission: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
