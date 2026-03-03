import type { Response } from "express";
import { ServiceResponse } from "./serviceResponse";
export declare const sendResponse: (res: Response, serviceResponse: ServiceResponse<any>, response: Response) => Response;
