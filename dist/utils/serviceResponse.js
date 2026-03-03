"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
const httpHandlers_1 = require("./httpHandlers");
class ServiceResponse {
    constructor(init) {
        this.success = init.success ?? false;
        this.message = init.message ?? '';
        this.result = init.result ?? null;
        this.statusCode = init.statusCode ?? 200;
        // Add any additional custom fields
        if (init) {
            Object.keys(init).forEach(key => {
                if (!['success', 'message', 'result', 'statusCode'].includes(key)) {
                    this[key] = init[key];
                }
            });
        }
    }
    static success(message = 'Operation completed successfully', result = null, statusCode = 200, customFields = {}) {
        return new ServiceResponse({
            success: true,
            message,
            result,
            statusCode,
            ...customFields
        });
    }
    static successWithExtra(message, result, extra, statusCode = 200) {
        return new ServiceResponse({
            success: true,
            message,
            result,
            statusCode,
            ...extra
        });
    }
    static failure(message = 'An error occurred', result = null, statusCode = 400, customFields = {}) {
        return new ServiceResponse({
            success: false,
            message,
            result,
            statusCode,
            ...customFields
        });
    }
    static send(response, serviceResponse) {
        return (0, httpHandlers_1.sendResponse)(response, serviceResponse, response);
    }
}
exports.ServiceResponse = ServiceResponse;
//# sourceMappingURL=serviceResponse.js.map