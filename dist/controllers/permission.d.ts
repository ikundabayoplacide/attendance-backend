import { ServiceResponse } from '../utils/serviceResponse';
import { Controller } from 'tsoa';
import { PermissionResponse } from '../types/responses';
export interface PermissionCreateRequest {
    name: string;
    description?: string | null;
}
export interface PermissionUpdateRequest {
    name?: string;
    description?: string | null;
}
export declare class PermissionController extends Controller {
    getAllPermissions(): Promise<ServiceResponse<PermissionResponse[]>>;
    getPermissionById(permissionId: string): Promise<ServiceResponse<PermissionResponse | null>>;
    createPermission(data: PermissionCreateRequest): Promise<ServiceResponse<PermissionResponse | null>>;
    updatePermission(permissionId: string, data: PermissionUpdateRequest): Promise<ServiceResponse<PermissionResponse | null>>;
    deletePermission(permissionId: string): Promise<ServiceResponse<null>>;
}
