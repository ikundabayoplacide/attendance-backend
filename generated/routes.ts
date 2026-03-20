/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controllers/role';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PermissionController } from './../controllers/permission';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HandoverController } from './../controllers/handover';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './../controllers/event';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EquipementController } from './../controllers/equipment';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CardController } from './../controllers/card';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AttendanceController } from './../controllers/attendance';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { appointmentController } from './../controllers/appointment';
import { expressAuthentication } from './../middlewares/auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["active"]},{"dataType":"enum","enums":["inactive"]},{"dataType":"enum","enums":["suspended"]},{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["deleted"]},{"dataType":"enum","enums":["archived"]},{"dataType":"enum","enums":["rejected"]},{"dataType":"enum","enums":["blacklisted"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPermissionAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRoleAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"IPermissionAttributes"}},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserAttributes": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "fullName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "status": {"ref":"UserStatus","required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"IRoleAttributes"}},
            "profilePicture": {"dataType":"string"},
            "dateOfBirth": {"dataType":"datetime"},
            "nationalId": {"dataType":"string"},
            "fingerPrint": {"dataType":"string"},
            "face": {"dataType":"string"},
            "voice": {"dataType":"string"},
            "signature": {"dataType":"string"},
            "passport": {"dataType":"string"},
            "motion": {"dataType":"string"},
            "igipande": {"dataType":"string"},
            "ocr": {"dataType":"string"},
            "gesture": {"dataType":"string"},
            "pupil": {"dataType":"string"},
            "otherBiometric": {"dataType":"string"},
            "nationality": {"dataType":"string"},
            "country": {"dataType":"string"},
            "province": {"dataType":"string"},
            "district": {"dataType":"string"},
            "sector": {"dataType":"string"},
            "cell": {"dataType":"string"},
            "village": {"dataType":"string"},
            "personalInChargeNationalId": {"dataType":"string"},
            "personalInChargeName": {"dataType":"string"},
            "personalInChargePhone": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "personalInChargeEmail": {"dataType":"string"},
            "personalInChargeRelation": {"dataType":"string"},
            "personalInChargeOtherDetails": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsersListResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"IUserAttributes"}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"IUserAttributes"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "userId": {"dataType":"string","required":true},
            "checkIn": {"dataType":"datetime","required":true},
            "date": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserWithAttendanceResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"isNewUser":{"dataType":"boolean","required":true},"attendance":{"dataType":"union","subSchemas":[{"ref":"AttendanceInfo"},{"dataType":"enum","enums":[null]}],"required":true},"user":{"dataType":"union","subSchemas":[{"ref":"IUserAttributes"},{"dataType":"enum","enums":[null]}],"required":true}}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "fullName": {"dataType":"string","required":true},
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "scannedId": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string"},
            "status": {"dataType":"string"},
            "category": {"dataType":"string"},
            "badge": {"dataType":"string"},
            "role": {"dataType":"string"},
            "company": {"dataType":"string"},
            "department": {"dataType":"string"},
            "nationalId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "fullName": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "department": {"dataType":"string"},
            "role": {"dataType":"string"},
            "category": {"dataType":"string"},
            "company": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "category": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"PermissionResponse"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_RoleResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"RoleResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "category": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "permissionIds": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "category": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "permissionIds": {"dataType":"array","array":{"dataType":"string"}},
            "permissions": {"dataType":"array","array":{"dataType":"any"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[null]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_PermissionResponse-Array_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"PermissionResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_PermissionResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"PermissionResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandoverResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "outgoingUser": {"dataType":"string","required":true},
            "incomingUser": {"dataType":"string","required":true},
            "handOverShift": {"dataType":"string","required":true},
            "handOverDate": {"dataType":"datetime","required":true},
            "handOverTime": {"dataType":"string","required":true},
            "handOverItems": {"dataType":"string","required":true},
            "handOverDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_HandoverResponse-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"HandoverResponse"}},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_HandoverResponse_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"HandoverResponse"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_HandoverResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"HandoverResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandoverCreateAttributes": {
        "dataType": "refObject",
        "properties": {
            "outgoingUser": {"dataType":"string","required":true},
            "incomingUser": {"dataType":"string","required":true},
            "equipmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "handOverDate": {"dataType":"datetime","required":true},
            "handOverTime": {"dataType":"string","required":true},
            "handOverDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "handOverItems": {"dataType":"string","required":true},
            "handOverShift": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandoverUpdateAttributes": {
        "dataType": "refObject",
        "properties": {
            "outgoingUser": {"dataType":"string"},
            "incomingUser": {"dataType":"string"},
            "equipmentId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "handOverDate": {"dataType":"datetime"},
            "handOverTime": {"dataType":"string"},
            "handOverDescription": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "handOverItems": {"dataType":"string"},
            "handOverShift": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "eventDate": {"dataType":"string"},
            "eventTime": {"dataType":"string"},
            "timeDuration": {"dataType":"string"},
            "eventLocation": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_EventResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"EventResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "hoster": {"dataType":"string"},
            "eventDate": {"dataType":"string"},
            "eventTime": {"dataType":"string"},
            "expectedAttendees": {"dataType":"string"},
            "timeDuration": {"dataType":"string"},
            "eventLocation": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_EventResponse-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"EventResponse"}},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EventUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "eventDate": {"dataType":"string"},
            "hoster": {"dataType":"string"},
            "eventTime": {"dataType":"string"},
            "expectedAttendees": {"dataType":"string"},
            "timeDuration": {"dataType":"string"},
            "eventLocation": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EquipementResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "serialNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "quantity": {"dataType":"double"},
            "status": {"dataType":"string","required":true},
            "assignedTo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_EquipementResponse-Array-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"EquipementResponse"}},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_EquipementResponse_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"EquipementResponse"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_EquipementResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"EquipementResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EquipementCreateAttributes": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "serialNumber": {"dataType":"string"},
            "quantity": {"dataType":"double"},
            "status": {"dataType":"string"},
            "assignedTo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EquipementUpdateAttributes": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "serialNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "quantity": {"dataType":"double"},
            "status": {"dataType":"string"},
            "assignedTo": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "cardNumber": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "doneBy": {"dataType":"string"},
            "location": {"dataType":"string"},
            "branch": {"dataType":"string"},
            "assignedTo": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardListResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"CardResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CardSingleResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"CardResponse"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCardRequest": {
        "dataType": "refObject",
        "properties": {
            "cardNumber": {"dataType":"string","required":true},
            "location": {"dataType":"string"},
            "description": {"dataType":"string"},
            "branch": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["assigned"]},{"dataType":"enum","enums":["available"]},{"dataType":"enum","enums":["maintenance"]}],"required":true},
            "doneBy": {"dataType":"string"},
            "assignedTo": {"dataType":"string"},
            "assignedAt": {"dataType":"datetime"},
            "lastUsed": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCardRequest": {
        "dataType": "refObject",
        "properties": {
            "cardNumber": {"dataType":"string"},
            "description": {"dataType":"string"},
            "location": {"dataType":"string"},
            "branch": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["assigned"]},{"dataType":"enum","enums":["available"]},{"dataType":"enum","enums":["maintenance"]}]},
            "doneBy": {"dataType":"string"},
            "assignedTo": {"dataType":"string"},
            "assignedAt": {"dataType":"datetime"},
            "lastUsed": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "password": {"dataType":"string","required":true},
            "phone": {"dataType":"string"},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["phone"]},{"dataType":"enum","enums":["email"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUserAttributes.Exclude_keyofIUserAttributes.password-or-googleId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"fullName":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"phoneNumber":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"status":{"ref":"UserStatus","required":true},"roles":{"dataType":"array","array":{"dataType":"refObject","ref":"IRoleAttributes"}},"profilePicture":{"dataType":"string"},"dateOfBirth":{"dataType":"datetime"},"nationalId":{"dataType":"string"},"fingerPrint":{"dataType":"string"},"face":{"dataType":"string"},"voice":{"dataType":"string"},"signature":{"dataType":"string"},"passport":{"dataType":"string"},"motion":{"dataType":"string"},"igipande":{"dataType":"string"},"ocr":{"dataType":"string"},"gesture":{"dataType":"string"},"pupil":{"dataType":"string"},"otherBiometric":{"dataType":"string"},"nationality":{"dataType":"string"},"country":{"dataType":"string"},"province":{"dataType":"string"},"district":{"dataType":"string"},"sector":{"dataType":"string"},"cell":{"dataType":"string"},"village":{"dataType":"string"},"personalInChargeNationalId":{"dataType":"string"},"personalInChargeName":{"dataType":"string"},"personalInChargePhone":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"personalInChargeEmail":{"dataType":"string"},"personalInChargeRelation":{"dataType":"string"},"personalInChargeOtherDetails":{"dataType":"string"},"createdAt":{"dataType":"datetime"},"updatedAt":{"dataType":"datetime"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "fullName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "status": {"ref":"UserStatus","required":true},
            "roles": {"dataType":"array","array":{"dataType":"any"}},
            "profilePicture": {"dataType":"string"},
            "dateOfBirth": {"dataType":"datetime"},
            "nationalId": {"dataType":"string"},
            "fingerPrint": {"dataType":"string"},
            "face": {"dataType":"string"},
            "voice": {"dataType":"string"},
            "signature": {"dataType":"string"},
            "passport": {"dataType":"string"},
            "motion": {"dataType":"string"},
            "igipande": {"dataType":"string"},
            "ocr": {"dataType":"string"},
            "gesture": {"dataType":"string"},
            "pupil": {"dataType":"string"},
            "otherBiometric": {"dataType":"string"},
            "nationality": {"dataType":"string"},
            "country": {"dataType":"string"},
            "province": {"dataType":"string"},
            "district": {"dataType":"string"},
            "sector": {"dataType":"string"},
            "cell": {"dataType":"string"},
            "village": {"dataType":"string"},
            "personalInChargeNationalId": {"dataType":"string"},
            "personalInChargeName": {"dataType":"string"},
            "personalInChargePhone": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "personalInChargeEmail": {"dataType":"string"},
            "personalInChargeRelation": {"dataType":"string"},
            "personalInChargeOtherDetails": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse__user-IUserResponse-or-null__": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"user":{"dataType":"union","subSchemas":[{"ref":"IUserResponse"},{"dataType":"enum","enums":[null]}],"required":true}}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignupRequest": {
        "dataType": "refObject",
        "properties": {
            "fullName": {"dataType":"string","required":true},
            "email": {"dataType":"string"},
            "roleType": {"dataType":"string"},
            "password": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse__user-IUserResponse-or-null--accessToken_63_-string--refreshToken_63_-string__": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string"},"accessToken":{"dataType":"string"},"user":{"dataType":"union","subSchemas":[{"ref":"IUserResponse"},{"dataType":"enum","enums":[null]}],"required":true}}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse__exists-boolean__": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"exists":{"dataType":"boolean","required":true}}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse__accessToken-string--refreshToken-string__": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true},"accessToken":{"dataType":"string","required":true}}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "userId": {"dataType":"string","required":true},
            "checkIn": {"dataType":"datetime","required":true},
            "checkOut": {"dataType":"datetime"},
            "hoster": {"dataType":"string"},
            "badge": {"dataType":"string"},
            "date": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "note": {"dataType":"string"},
            "user": {"dataType":"any"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceListResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"AttendanceResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttendanceSingleResponse": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"AttendanceResponse"},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckOutRequest": {
        "dataType": "refObject",
        "properties": {
            "note": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAttendanceRequest": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["present"]},{"dataType":"enum","enums":["late"]},{"dataType":"enum","enums":["left_early"]},{"dataType":"enum","enums":["absent"]}]},
            "note": {"dataType":"string"},
            "checkOut": {"dataType":"datetime"},
            "checkIn": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppointmentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "userId": {"dataType":"string","required":true},
            "status": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "host": {"dataType":"string"},
            "department": {"dataType":"string"},
            "appointmentDate": {"dataType":"string"},
            "appointmentTime": {"dataType":"string"},
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"phoneNumber":{"dataType":"string","required":true},"department":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"fullName":{"dataType":"string","required":true}},"required":true},
            "timeDuration": {"dataType":"string"},
            "appointmentLocation": {"dataType":"string"},
            "createdAt": {"dataType":"datetime"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_AppointmentResponse-Array_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"AppointmentResponse"}},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceResponse_AppointmentResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"dataType":"union","subSchemas":[{"ref":"AppointmentResponse"},{"dataType":"enum","enums":[null]}]},{"dataType":"enum","enums":[null]}],"required":true},
            "statusCode": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppointmentCreateAttributes": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "purpose": {"dataType":"string","required":true},
            "host": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["confirmed"]},{"dataType":"enum","enums":["canceled"]},{"dataType":"enum","enums":["onhold"]},{"dataType":"enum","enums":["completed"]}],"required":true},
            "department": {"dataType":"string","required":true},
            "company": {"dataType":"string","required":true},
            "appointmentDate": {"dataType":"string","required":true},
            "appointmentTime": {"dataType":"string","required":true},
            "timeDuration": {"dataType":"string","required":true},
            "appointmentLocation": {"dataType":"string","required":true},
            "note": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAppointmentAttributes": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["confirmed"]},{"dataType":"enum","enums":["canceled"]},{"dataType":"enum","enums":["onhold"]},{"dataType":"enum","enums":["completed"]}]},
            "host": {"dataType":"string"},
            "department": {"dataType":"string"},
            "company": {"dataType":"string"},
            "appointmentDate": {"dataType":"string"},
            "appointmentTime": {"dataType":"string"},
            "timeDuration": {"dataType":"string"},
            "appointmentLocation": {"dataType":"string"},
            "note": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/users',
            authenticateMiddleware([{"jwt":["user:list"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAllUsers)),

            async function UserController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAllUsers, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/users/:id',
            authenticateMiddleware([{"jwt":["user:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            async function UserController_getUserById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                userData: {"in":"body","name":"userData","required":true,"ref":"UserCreateRequest"},
        };
        app.post('/api/users',
            authenticateMiddleware([{"jwt":["user:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                userData: {"in":"body","name":"userData","required":true,"ref":"UserUpdateRequest"},
        };
        app.put('/api/users/:id',
            authenticateMiddleware([{"jwt":["user:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_activateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/users/:id/activate',
            authenticateMiddleware([{"jwt":["user:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.activateUser)),

            async function UserController_activateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_activateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'activateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_suspendUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/users/:id/suspend',
            authenticateMiddleware([{"jwt":["user:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.suspendUser)),

            async function UserController_suspendUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_suspendUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'suspendUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/users/:id/delete',
            authenticateMiddleware([{"jwt":["user:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_listRoles: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
                search: {"in":"query","name":"search","dataType":"string"},
        };
        app.get('/api/roles',
            authenticateMiddleware([{"jwt":["role:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.listRoles)),

            async function RoleController_listRoles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_listRoles, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'listRoles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_getRoleById: Record<string, TsoaRoute.ParameterSchema> = {
                roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
        };
        app.get('/api/roles/:roleId',
            authenticateMiddleware([{"jwt":["role:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getRoleById)),

            async function RoleController_getRoleById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_getRoleById, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getRoleById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_createRole: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"RoleCreateRequest"},
        };
        app.post('/api/roles',
            authenticateMiddleware([{"jwt":["role:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.createRole)),

            async function RoleController_createRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_createRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'createRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_updateRole: Record<string, TsoaRoute.ParameterSchema> = {
                roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"RoleUpdateRequest"},
        };
        app.put('/api/roles/:roleId',
            authenticateMiddleware([{"jwt":["role:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.updateRole)),

            async function RoleController_updateRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_updateRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'updateRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_deleteRole: Record<string, TsoaRoute.ParameterSchema> = {
                roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
        };
        app.delete('/api/roles/:roleId',
            authenticateMiddleware([{"jwt":["role:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.deleteRole)),

            async function RoleController_deleteRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_deleteRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'deleteRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_removePermissionFromRole: Record<string, TsoaRoute.ParameterSchema> = {
                roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
        };
        app.delete('/api/roles/:roleId/permissions/:permissionId',
            authenticateMiddleware([{"jwt":["role:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.removePermissionFromRole)),

            async function RoleController_removePermissionFromRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_removePermissionFromRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'removePermissionFromRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionController_getAllPermissions: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/permissions',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getAllPermissions)),

            async function PermissionController_getAllPermissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionController_getAllPermissions, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'getAllPermissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionController_getPermissionById: Record<string, TsoaRoute.ParameterSchema> = {
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
        };
        app.get('/api/permissions/:permissionId',
            authenticateMiddleware([{"jwt":["permission:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getPermissionById)),

            async function PermissionController_getPermissionById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionController_getPermissionById, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'getPermissionById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionController_createPermission: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"PermissionCreateRequest"},
        };
        app.post('/api/permissions',
            authenticateMiddleware([{"jwt":["permission:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.createPermission)),

            async function PermissionController_createPermission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionController_createPermission, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'createPermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionController_updatePermission: Record<string, TsoaRoute.ParameterSchema> = {
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"PermissionUpdateRequest"},
        };
        app.put('/api/permissions/:permissionId',
            authenticateMiddleware([{"jwt":["permission:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.updatePermission)),

            async function PermissionController_updatePermission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionController_updatePermission, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'updatePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPermissionController_deletePermission: Record<string, TsoaRoute.ParameterSchema> = {
                permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
        };
        app.delete('/api/permissions/:permissionId',
            authenticateMiddleware([{"jwt":["permission:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.deletePermission)),

            async function PermissionController_deletePermission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPermissionController_deletePermission, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'deletePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_getAllHandovers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/handover',
            authenticateMiddleware([{"jwt":["handover:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.getAllHandovers)),

            async function HandoverController_getAllHandovers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_getAllHandovers, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'getAllHandovers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_getHandoverById: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
        };
        app.get('/api/handover/:handoverId',
            authenticateMiddleware([{"jwt":["handover:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.getHandoverById)),

            async function HandoverController_getHandoverById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_getHandoverById, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'getHandoverById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_createHandover: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"HandoverCreateAttributes"},
        };
        app.post('/api/handover',
            authenticateMiddleware([{"jwt":["handover:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.createHandover)),

            async function HandoverController_createHandover(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_createHandover, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'createHandover',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_updateHandover: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"HandoverUpdateAttributes"},
        };
        app.put('/api/handover/:handoverId',
            authenticateMiddleware([{"jwt":["handover:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.updateHandover)),

            async function HandoverController_updateHandover(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_updateHandover, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'updateHandover',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_confirmHandleOver: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
        };
        app.put('/api/handover/:handoverId/confirm',
            authenticateMiddleware([{"jwt":["handover:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.confirmHandleOver)),

            async function HandoverController_confirmHandleOver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_confirmHandleOver, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'confirmHandleOver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_completeHandleOver: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
        };
        app.put('/api/handover/:handoverId/complete',
            authenticateMiddleware([{"jwt":["handover:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.completeHandleOver)),

            async function HandoverController_completeHandleOver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_completeHandleOver, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'completeHandleOver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_cancelHandleOver: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
        };
        app.put('/api/handover/:handoverId/cancel',
            authenticateMiddleware([{"jwt":["handover:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.cancelHandleOver)),

            async function HandoverController_cancelHandleOver(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_cancelHandleOver, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'cancelHandleOver',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHandoverController_deleteHandover: Record<string, TsoaRoute.ParameterSchema> = {
                handoverId: {"in":"path","name":"handoverId","required":true,"dataType":"string"},
        };
        app.delete('/api/handover/:handoverId',
            authenticateMiddleware([{"jwt":["handover:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(HandoverController)),
            ...(fetchMiddlewares<RequestHandler>(HandoverController.prototype.deleteHandover)),

            async function HandoverController_deleteHandover(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHandoverController_deleteHandover, request, response });

                const controller = new HandoverController();

              await templateService.apiHandler({
                methodName: 'deleteHandover',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_createEvent: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"EventCreateRequest"},
        };
        app.post('/api/events',
            authenticateMiddleware([{"jwt":["event:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.createEvent)),

            async function EventController_createEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_createEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'createEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getAllEvents: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/events',
            authenticateMiddleware([{"jwt":["event:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getAllEvents)),

            async function EventController_getAllEvents(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getAllEvents, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getAllEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getEventById: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
        };
        app.get('/api/events/:eventId',
            authenticateMiddleware([{"jwt":["event:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getEventById)),

            async function EventController_getEventById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getEventById, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getEventById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_updateEvent: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"EventUpdateRequest"},
        };
        app.put('/api/events/:eventId',
            authenticateMiddleware([{"jwt":["event:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.updateEvent)),

            async function EventController_updateEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_updateEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'updateEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_confirmEvent: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
        };
        app.put('/api/events/:eventId/confirm',
            authenticateMiddleware([{"jwt":["event:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.confirmEvent)),

            async function EventController_confirmEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_confirmEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'confirmEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_cancelEvent: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
        };
        app.put('/api/events/:eventId/cancel',
            authenticateMiddleware([{"jwt":["event:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.cancelEvent)),

            async function EventController_cancelEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_cancelEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'cancelEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_makeCompletedEvent: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
        };
        app.put('/api/events/:eventId/complete',
            authenticateMiddleware([{"jwt":["event:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.makeCompletedEvent)),

            async function EventController_makeCompletedEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_makeCompletedEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'makeCompletedEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_deleteEvent: Record<string, TsoaRoute.ParameterSchema> = {
                eventId: {"in":"path","name":"eventId","required":true,"dataType":"string"},
        };
        app.delete('/api/events/:eventId',
            authenticateMiddleware([{"jwt":["event:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.deleteEvent)),

            async function EventController_deleteEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_deleteEvent, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'deleteEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_getAllEquipements: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/equipements',
            authenticateMiddleware([{"jwt":["equipement:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.getAllEquipements)),

            async function EquipementController_getAllEquipements(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_getAllEquipements, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'getAllEquipements',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_getEquipementById: Record<string, TsoaRoute.ParameterSchema> = {
                equipementId: {"in":"path","name":"equipementId","required":true,"dataType":"string"},
        };
        app.get('/api/equipements/:equipementId',
            authenticateMiddleware([{"jwt":["equipement:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.getEquipementById)),

            async function EquipementController_getEquipementById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_getEquipementById, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'getEquipementById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_createEquipement: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"EquipementCreateAttributes"},
        };
        app.post('/api/equipements',
            authenticateMiddleware([{"jwt":["equipement:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.createEquipement)),

            async function EquipementController_createEquipement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_createEquipement, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'createEquipement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_updateEquipement: Record<string, TsoaRoute.ParameterSchema> = {
                equipementId: {"in":"path","name":"equipementId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"EquipementUpdateAttributes"},
        };
        app.put('/api/equipements/:equipementId',
            authenticateMiddleware([{"jwt":["equipement:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.updateEquipement)),

            async function EquipementController_updateEquipement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_updateEquipement, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'updateEquipement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_assignEquipement: Record<string, TsoaRoute.ParameterSchema> = {
                equipementId: {"in":"path","name":"equipementId","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},
        };
        app.put('/api/equipements/:equipementId/assign',
            authenticateMiddleware([{"jwt":["equipement:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.assignEquipement)),

            async function EquipementController_assignEquipement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_assignEquipement, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'assignEquipement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEquipementController_deleteEquipement: Record<string, TsoaRoute.ParameterSchema> = {
                equipementId: {"in":"path","name":"equipementId","required":true,"dataType":"string"},
        };
        app.delete('/api/equipements/:equipementId',
            authenticateMiddleware([{"jwt":["equipement:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipementController)),
            ...(fetchMiddlewares<RequestHandler>(EquipementController.prototype.deleteEquipement)),

            async function EquipementController_deleteEquipement(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipementController_deleteEquipement, request, response });

                const controller = new EquipementController();

              await templateService.apiHandler({
                methodName: 'deleteEquipement',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_getAllCards: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/cards',
            authenticateMiddleware([{"jwt":["card:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.getAllCards)),

            async function CardController_getAllCards(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_getAllCards, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'getAllCards',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_createCard: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateCardRequest"},
        };
        app.post('/api/cards',
            authenticateMiddleware([{"jwt":["card:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.createCard)),

            async function CardController_createCard(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_createCard, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'createCard',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_getCard: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/cards/:id',
            authenticateMiddleware([{"jwt":["card:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.getCard)),

            async function CardController_getCard(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_getCard, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'getCard',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_assignCard: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},
        };
        app.put('/api/cards/assign/:id',
            authenticateMiddleware([{"jwt":["card:assign"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.assignCard)),

            async function CardController_assignCard(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_assignCard, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'assignCard',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_updateCard: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateCardRequest"},
        };
        app.put('/api/cards/:id',
            authenticateMiddleware([{"jwt":["card:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.updateCard)),

            async function CardController_updateCard(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_updateCard, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'updateCard',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCardController_deleteCard: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/cards/:id',
            authenticateMiddleware([{"jwt":["card:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(CardController)),
            ...(fetchMiddlewares<RequestHandler>(CardController.prototype.deleteCard)),

            async function CardController_deleteCard(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCardController_deleteCard, request, response });

                const controller = new CardController();

              await templateService.apiHandler({
                methodName: 'deleteCard',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                credentials: {"in":"body","name":"credentials","required":true,"ref":"LoginRequest"},
                res: {"in":"res","name":"403","required":true,"ref":"ServiceResponse__user-IUserResponse-or-null__"},
        };
        app.post('/api/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_getCurrentUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                res: {"in":"res","name":"401","required":true,"ref":"ServiceResponse__user-IUserResponse-or-null__"},
        };
        app.get('/api/auth/me',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getCurrentUser)),

            async function AuthController_getCurrentUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_getCurrentUser, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'getCurrentUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_signup: Record<string, TsoaRoute.ParameterSchema> = {
                signupData: {"in":"body","name":"signupData","required":true,"ref":"SignupRequest"},
                res: {"in":"res","name":"409","required":true,"ref":"ServiceResponse__user-IUserResponse-or-null--accessToken_63_-string--refreshToken_63_-string__"},
        };
        app.post('/api/auth/signup',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.signup)),

            async function AuthController_signup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_signup, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_checkEmail: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
        };
        app.post('/api/auth/check-email',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.checkEmail)),

            async function AuthController_checkEmail(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_checkEmail, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'checkEmail',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_refreshToken: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true}}},
                res: {"in":"res","name":"401","required":true,"ref":"ServiceResponse__accessToken-string--refreshToken-string__"},
        };
        app.post('/api/auth/refresh',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.refreshToken)),

            async function AuthController_refreshToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_refreshToken, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_logout: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                res: {"in":"res","name":"200","required":true,"ref":"ServiceResponse_null_"},
        };
        app.post('/api/auth/logout',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.logout)),

            async function AuthController_logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_logout, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getAllAttendance: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/attendance',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getAllAttendance)),

            async function AttendanceController_getAllAttendance(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getAllAttendance, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getAllAttendance',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getAttendanceById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/attendance/:id',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getAttendanceById)),

            async function AttendanceController_getAttendanceById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getAttendanceById, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getAttendanceById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getAttendanceByUserId: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.get('/api/attendance/by-user/:userId',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getAttendanceByUserId)),

            async function AttendanceController_getAttendanceByUserId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getAttendanceByUserId, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getAttendanceByUserId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getAttendanceByDate: Record<string, TsoaRoute.ParameterSchema> = {
                date: {"in":"path","name":"date","required":true,"dataType":"string"},
        };
        app.get('/api/attendance/by-date/:date',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getAttendanceByDate)),

            async function AttendanceController_getAttendanceByDate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getAttendanceByDate, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getAttendanceByDate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getAttendanceReport: Record<string, TsoaRoute.ParameterSchema> = {
                startDate: {"in":"path","name":"startDate","required":true,"dataType":"string"},
                endDate: {"in":"path","name":"endDate","required":true,"dataType":"string"},
        };
        app.get('/api/attendance/report/range/:startDate/:endDate',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getAttendanceReport)),

            async function AttendanceController_getAttendanceReport(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getAttendanceReport, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getAttendanceReport',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_getUserAttendanceReport: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                startDate: {"in":"path","name":"startDate","required":true,"dataType":"string"},
                endDate: {"in":"path","name":"endDate","required":true,"dataType":"string"},
        };
        app.get('/api/attendance/report/user/:userId/:startDate/:endDate',
            authenticateMiddleware([{"jwt":["attendance:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.getUserAttendanceReport)),

            async function AttendanceController_getUserAttendanceReport(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_getUserAttendanceReport, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'getUserAttendanceReport',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_checkOut: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"CheckOutRequest"},
        };
        app.put('/api/attendance/:id/checkout',
            authenticateMiddleware([{"jwt":["attendance:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.checkOut)),

            async function AttendanceController_checkOut(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_checkOut, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'checkOut',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_updateAttendance: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"UpdateAttendanceRequest"},
        };
        app.put('/api/attendance/:id',
            authenticateMiddleware([{"jwt":["attendance:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.updateAttendance)),

            async function AttendanceController_updateAttendance(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_updateAttendance, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'updateAttendance',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAttendanceController_deleteAttendance: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/attendance/:id',
            authenticateMiddleware([{"jwt":["attendance:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController)),
            ...(fetchMiddlewares<RequestHandler>(AttendanceController.prototype.deleteAttendance)),

            async function AttendanceController_deleteAttendance(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAttendanceController_deleteAttendance, request, response });

                const controller = new AttendanceController();

              await templateService.apiHandler({
                methodName: 'deleteAttendance',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAllAppointments: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/appointments',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAllAppointments)),

            async function appointmentController_getAllAppointments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAllAppointments, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAllAppointments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByUserId: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/user/:userId',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByUserId)),

            async function appointmentController_getAppointmentsByUserId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByUserId, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByUserId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByDate: Record<string, TsoaRoute.ParameterSchema> = {
                date: {"in":"path","name":"date","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/date/:date',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByDate)),

            async function appointmentController_getAppointmentsByDate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByDate, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByDate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByDepartment: Record<string, TsoaRoute.ParameterSchema> = {
                department: {"in":"path","name":"department","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/department/:department',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByDepartment)),

            async function appointmentController_getAppointmentsByDepartment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByDepartment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByDepartment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByHost: Record<string, TsoaRoute.ParameterSchema> = {
                host: {"in":"path","name":"host","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/host/:host',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByHost)),

            async function appointmentController_getAppointmentsByHost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByHost, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByHost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByTime: Record<string, TsoaRoute.ParameterSchema> = {
                time: {"in":"path","name":"time","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/time/:time',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByTime)),

            async function appointmentController_getAppointmentsByTime(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByTime, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByTime',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentsByLocation: Record<string, TsoaRoute.ParameterSchema> = {
                location: {"in":"path","name":"location","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/location/:location',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentsByLocation)),

            async function appointmentController_getAppointmentsByLocation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentsByLocation, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentsByLocation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_getAppointmentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/appointments/:id',
            authenticateMiddleware([{"jwt":["appointment:read"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.getAppointmentById)),

            async function appointmentController_getAppointmentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_getAppointmentById, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointmentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_createAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"AppointmentCreateAttributes"},
        };
        app.post('/api/appointments',
            authenticateMiddleware([{"jwt":["appointment:create"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.createAppointment)),

            async function appointmentController_createAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_createAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'createAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_updateAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"ref":"UpdateAppointmentAttributes"},
        };
        app.put('/api/appointments/:id',
            authenticateMiddleware([{"jwt":["appointment:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.updateAppointment)),

            async function appointmentController_updateAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_updateAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'updateAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_confirmAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/appointments/confirm/:id',
            authenticateMiddleware([{"jwt":["appointment:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.confirmAppointment)),

            async function appointmentController_confirmAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_confirmAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'confirmAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_cancelAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/appointments/cancel/:id',
            authenticateMiddleware([{"jwt":["appointment:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.cancelAppointment)),

            async function appointmentController_cancelAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_cancelAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'cancelAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_onholdAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/appointments/onhold/:id',
            authenticateMiddleware([{"jwt":["appointment:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.onholdAppointment)),

            async function appointmentController_onholdAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_onholdAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'onholdAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_completeAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.put('/api/appointments/complete/:id',
            authenticateMiddleware([{"jwt":["appointment:update"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.completeAppointment)),

            async function appointmentController_completeAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_completeAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'completeAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsappointmentController_deleteAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/appointments/:id',
            authenticateMiddleware([{"jwt":["appointment:delete"]}]),
            ...(fetchMiddlewares<RequestHandler>(appointmentController)),
            ...(fetchMiddlewares<RequestHandler>(appointmentController.prototype.deleteAppointment)),

            async function appointmentController_deleteAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsappointmentController_deleteAppointment, request, response });

                const controller = new appointmentController();

              await templateService.apiHandler({
                methodName: 'deleteAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
