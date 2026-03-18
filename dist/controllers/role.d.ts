import { Controller } from "tsoa";
import { ServiceResponse } from "../utils/serviceResponse";
import { RoleResponse } from "../types/responses";
interface RoleCreateRequest {
    name: string;
    description?: string | null;
    category?: string | null;
    permissionIds?: string[];
}
interface RoleUpdateRequest {
    name?: string;
    description?: string | null;
    category?: string | null;
    permissionIds?: string[];
    permissions?: any[];
}
export declare class RoleController extends Controller {
    listRoles(page: number, limit: number, search?: string): Promise<any>;
    getRoleById(roleId: string): Promise<ServiceResponse<RoleResponse | null>>;
    createRole(data: RoleCreateRequest): Promise<ServiceResponse<RoleResponse | null>>;
    updateRole(roleId: string, data: RoleUpdateRequest): Promise<ServiceResponse<RoleResponse | null>>;
    deleteRole(roleId: string): Promise<ServiceResponse<null>>;
    removePermissionFromRole(roleId: string, permissionId: string): Promise<ServiceResponse<null>>;
}
export {};
