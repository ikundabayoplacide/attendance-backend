import { Controller } from "tsoa";
export declare class HealthController extends Controller {
    getHealth(): Promise<{
        status: string;
    }>;
}
