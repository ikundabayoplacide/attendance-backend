"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, serviceResponse, response) => {
    const { statusCode, success, message, result, ...rest } = serviceResponse;
    return response.status(statusCode).json({
        success,
        message,
        result,
        ...rest
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=httpHandlers.js.map