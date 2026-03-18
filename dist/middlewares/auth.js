"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOptionalPermission = exports.checkPermission = exports.checkOptionalAuth = exports.checkAuth = void 0;
exports.expressAuthentication = expressAuthentication;
const serviceResponse_1 = require("../utils/serviceResponse");
const jwt_1 = require("../utils/jwt");
const models_1 = __importDefault(require("../models"));
// helper function to extract token from Request
function extractToken(request) {
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    if (request.cookies?.token) {
        return request.cookies.token;
    }
    return null;
}
// Reusable function to fetch user and attach organization data
async function fetchUserWithDetails(userId, decodedToken) {
    const user = await models_1.default.User.findByPk(userId, {
        include: [
            {
                model: models_1.default.Role,
                as: 'roles',
                attributes: ['id', 'name'],
                include: [{
                        model: models_1.default.Permission,
                        as: 'permissions',
                        attributes: ['name', 'description']
                    }]
            }
        ]
    });
    if (!user) {
        throw new Error('User not found');
    }
    if (decodedToken) {
        user.decodedToken = decodedToken;
    }
    return user;
}
//middleware to check auth.ts-checkUserPermissions function
function checkUserPermissions(user, scopes) {
    if (!scopes || scopes.length === 0) {
        return true;
    }
    const userPermissions = user?.roles?.flatMap((role) => role.permissions?.map(p => p.name) || []) || [];
    return scopes.some(scope => userPermissions.includes(scope));
}
//TSOA authentication function
async function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'jwt') {
        try {
            const token = extractToken(request);
            console.log('Token extracted:', token ? 'Yes' : 'No');
            console.log('Token value:', token?.substring(0, 20) + '...');
            if (!token) {
                return Promise.reject(new Error('No token provided'));
            }
            let decoded;
            try {
                decoded = await (0, jwt_1.verifyToken)(token, 'access');
                console.log('Token decoded successfully:', decoded);
            }
            catch (verifyError) {
                console.error('Token verification failed:', verifyError.message);
                throw verifyError;
            }
            if (!decoded || !decoded.userId) {
                console.error('Decoded token missing userId:', decoded);
                return Promise.reject(new Error('Invalid token'));
            }
            const user = await fetchUserWithDetails(decoded.userId, decoded);
            console.log('User fetched:', user ? 'Yes' : 'No');
            if (!checkUserPermissions(user, scopes)) {
                return Promise.reject(new Error('Forbidden: Insufficient permissions'));
            }
            return Promise.resolve(user);
        }
        catch (error) {
            console.error('JWT Auth Error:', error.message);
            return Promise.reject(new Error(error.message || 'Invalid token'));
        }
    }
    if (securityName === 'optionalJwt') {
        try {
            const token = extractToken(request);
            if (!token) {
                if (scopes && scopes.length > 0) {
                    return Promise.reject(new Error('Forbidden: Insufficient permissions'));
                }
                return Promise.resolve({ roles: [] });
            }
            const decoded = await (0, jwt_1.verifyToken)(token, 'access');
            if (!decoded || !decoded.userId) {
                return Promise.reject(new Error('Invalid token'));
            }
            const user = await fetchUserWithDetails(decoded.userId, decoded);
            if (!checkUserPermissions(user, scopes)) {
                return Promise.reject(new Error('Forbidden: Insufficient permissions'));
            }
            return Promise.resolve(user);
        }
        catch (error) {
            return Promise.reject(new Error(error.message || 'Invalid token'));
        }
    }
    return Promise.reject(new Error(`Unknown security scheme: ${securityName}`));
}
//Optional:Keep old middleware for routes not managed by TSOA
const checkAuth = async (req, res, next) => {
    try {
        const user = await expressAuthentication(req, 'jwt');
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json(serviceResponse_1.ServiceResponse.failure(error.message, null, 401));
    }
};
exports.checkAuth = checkAuth;
const checkOptionalAuth = async (req, res, next) => {
    try {
        const user = await expressAuthentication(req, 'optionalJwt');
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json(serviceResponse_1.ServiceResponse.failure(error.message, null, 401));
    }
};
exports.checkOptionalAuth = checkOptionalAuth;
const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            await expressAuthentication(req, 'jwt', [requiredPermission]);
            next();
        }
        catch (error) {
            const statusCode = error.message.includes('Forbidden') ? 403 : 401;
            return res.status(statusCode).json(serviceResponse_1.ServiceResponse.failure(error.message, null, statusCode));
        }
    };
};
exports.checkPermission = checkPermission;
const checkOptionalPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            await expressAuthentication(req, 'optionalJwt', [requiredPermission]);
            next();
        }
        catch (error) {
            const statusCode = error.message.includes('Forbidden') ? 403 : 401;
            return res.status(statusCode).json(serviceResponse_1.ServiceResponse.failure(error.message, null, statusCode));
        }
    };
};
exports.checkOptionalPermission = checkOptionalPermission;
//# sourceMappingURL=auth.js.map