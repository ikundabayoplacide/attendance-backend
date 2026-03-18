"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const runtime_1 = require("@tsoa/runtime");
const bcrypt_1 = require("bcrypt");
const serviceResponse_1 = require("../utils/serviceResponse");
const database_1 = __importDefault(require("../config/database"));
const models_1 = __importDefault(require("../models"));
const errorHandler_1 = require("../middlewares/errorHandler");
const validationHelpers_1 = require("../utils/validationHelpers");
const jwt_1 = require("../utils/jwt");
let AuthController = class AuthController extends runtime_1.Controller {
    async _buildUserResponse(user) {
        const roles = await user.getRoles({
            attributes: ['id', 'name', 'description'],
            include: [{
                    model: models_1.default.Permission,
                    as: 'permissions',
                    through: {
                        attributes: []
                    },
                    attributes: ['id', 'name', 'description']
                }]
        });
        const { password, ...userData } = user.toJSON();
        return {
            ...userData,
            roles: roles.map(role => role.toJSON())
        };
    }
    async login(credentials, res) {
        const { email, password, phone } = credentials;
        if ((!email && !phone) || !password) {
            res(401, serviceResponse_1.ServiceResponse.failure('Invalid credentials', { user: null }));
            return;
        }
        let where;
        if (email) {
            where = { email: email };
        }
        else if (phone) {
            where = { phoneNumber: phone };
        }
        const data = await models_1.default.User.findOne({ where });
        const user = data?.toJSON();
        if (!user || !user.password || !(await (0, bcrypt_1.compare)(password, user.password))) {
            res(401, serviceResponse_1.ServiceResponse.failure('Invalid credentials', { user: null }));
            return;
        }
        if (user.status === 'inactive') {
            res(403, serviceResponse_1.ServiceResponse.failure('Account is inactive. Please contact support', { user: null }));
            return;
        }
        if (user.status === 'pending') {
            res(403, serviceResponse_1.ServiceResponse.failure('Account is waiting for approval', { user: null }));
            return;
        }
        const tokens = await this.generateTokens(data);
        const userResponse = await this._buildUserResponse(data);
        // Get roles with permissions for logging
        const rolesWithPermissions = await data.getRoles({
            attributes: ['id', 'name'],
            include: [{
                    model: models_1.default.Permission,
                    as: 'permissions',
                    attributes: ['name']
                }]
        });
        // Log successful login with user details
        const roleNames = rolesWithPermissions.map((role) => role.name).join(', ');
        console.log(`Login Successful - User: ${user.fullName} (${user.email}) - Roles: ${roleNames}`);
        console.log("User Permissions:", rolesWithPermissions.flatMap((role) => role.permissions?.map((perm) => perm.name) || []));
        return res(200, serviceResponse_1.ServiceResponse.success('Login successful', { user: userResponse, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }));
    }
    // Auth me
    async getCurrentUser(req, res) {
        try {
            const userId = req.user?.id;
            //Get fresh user data from the database with roles and permissions
            const userModel = await models_1.default.User.findByPk(userId, {
                include: [
                    {
                        model: models_1.default.Role,
                        as: 'roles',
                        attributes: ['id', 'name', 'description'],
                        through: { attributes: [] },
                        required: false
                    }
                ]
            });
            console.log('User found in DB:', userModel ? 'Yes' : 'No');
            if (!userModel) {
                console.log('User not found in database for ID:', userId);
                res(401, serviceResponse_1.ServiceResponse.failure('User not found', { user: null }));
                return;
            }
            const userResponse = await this._buildUserResponse(userModel);
            res(200, serviceResponse_1.ServiceResponse.success('User retrieved successfully', { user: userResponse }));
        }
        catch (error) {
            console.error('Error in getCurrentUser:', error);
            res(401, serviceResponse_1.ServiceResponse.failure('Not authenticated', { user: null }));
        }
    }
    // The folllowing is for Signup for new user
    async signup(signupData, res) {
        const { fullName, email, roleType, password, phone } = signupData;
        // Comprehensive input validation using validation helpers
        const validation = (0, validationHelpers_1.validateSignupData)(signupData);
        if (!validation.isValid) {
            res(400, serviceResponse_1.ServiceResponse.failure(validation.message, { user: null }));
            return;
        }
        // We need to Clean phone number for database operations 
        const phoneStr = String(phone).trim();
        //Uniqueness checks with user-friendly messages
        const existingPhoneUser = await models_1.default.User.findOne({ where: { phoneNumber: phoneStr } });
        if (existingPhoneUser) {
            res(409, serviceResponse_1.ServiceResponse.failure('A user with this phone number already exists', { user: null }));
            return;
        }
        if (email && String(email).trim().toLowerCase()) {
            const existingEmailUser = await models_1.default.User.findOne({ where: { email: String(email).trim().toLowerCase() } });
            if (existingEmailUser) {
                res(409, serviceResponse_1.ServiceResponse.failure('A user with this email address already exists', { user: null }));
                return;
            }
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 12);
        const newUser = await database_1.default.transaction(async (t) => {
            // Clear data before saved to the database
            const userData = {
                fullName: (0, validationHelpers_1.sanitizeString)(fullName),
                email: email ? (0, validationHelpers_1.sanitizeString)(email).toLowerCase() : '',
                phoneNumber: phoneStr,
                password: hashedPassword,
                status: 'pending'
            };
            const user = await models_1.default.User.create(userData, { transaction: t });
            //Find or create Role
            let role = await models_1.default.Role.findOne({ where: { name: roleType }, transaction: t });
            //If the role doesn't exist , return error 
            if (!role) {
                res(400, serviceResponse_1.ServiceResponse.failure('Invalid role type, Please set valid role:', { user: null }));
                await t.rollback();
                return;
            }
            await user.addRole(role, { transaction: t });
            // save user
            await user.save({ transaction: t });
            return user;
        });
        if (!newUser) {
            res(400, serviceResponse_1.ServiceResponse.failure('Failed to create user', { user: null }));
            return;
        }
        const tokens = await this.generateTokens(newUser);
        const userResponse = await this._buildUserResponse(newUser);
        return res(201, serviceResponse_1.ServiceResponse.success('User created successfully', { user: userResponse, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }));
    }
    async checkEmail(request) {
        const { email } = request;
        if (!email || !email.trim()) {
            return serviceResponse_1.ServiceResponse.failure('Email is required', { exists: false }, 400);
        }
        const user = await models_1.default.User.findOne({ where: { email: email.trim().toLowerCase() } });
        return serviceResponse_1.ServiceResponse.success('Email checked successful', { exists: !!user });
    }
    async refreshToken(request, res) {
        const { refreshToken } = request;
        if (!refreshToken) {
            res(401, serviceResponse_1.ServiceResponse.failure('Refresh token is required', { accessToken: '', refreshToken: '' }));
            return;
        }
        try {
            const decoded = await (0, jwt_1.verifyToken)(refreshToken, 'refresh');
            if (!decoded || !decoded.userId) {
                res(401, serviceResponse_1.ServiceResponse.failure('Invalid refresh token', { accessToken: '', refreshToken: '' }));
                return;
            }
            const user = await models_1.default.User.findByPk(decoded.userId);
            if (!user) {
                res(401, serviceResponse_1.ServiceResponse.failure('User not found', { accessToken: '', refreshToken: '' }));
                return;
            }
            if (user.status !== 'active') {
                res(401, serviceResponse_1.ServiceResponse.failure('Account is not active', { accessToken: '', refreshToken: '' }));
                return;
            }
            const tokens = await this.generateTokens(user);
            return res(200, serviceResponse_1.ServiceResponse.success('Token refreshed successfully', tokens));
        }
        catch (error) {
            res(401, serviceResponse_1.ServiceResponse.failure(error.message || 'Invalid refresh token', { accessToken: '', refreshToken: '' }));
            return;
        }
    }
    async generateTokens(userModel) {
        const roles = await userModel.getRoles({ attributes: ['name'] });
        const rolesNames = roles.map((role) => role.name);
        const user = userModel.toJSON();
        const accessToken = await (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            roles: rolesNames,
            type: 'access',
        }, 86400);
        const refreshToken = await (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            roles: rolesNames,
            type: 'refresh',
        }, 604800);
        return { accessToken, refreshToken };
    }
    async generateToken(userModel) {
        const tokens = await this.generateTokens(userModel);
        return tokens.accessToken;
    }
    async blacklistToken(token) {
        const decoded = await (0, jwt_1.verifyToken)(token, 'access');
        const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 86400000);
        await models_1.default.BlacklistedToken.create({ token, expiresAt });
    }
    async logout(req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            await this.blacklistToken(token);
            console.log(`User logged out, token: ${token}`);
        }
        return res(200, serviceResponse_1.ServiceResponse.success('Logout successful', null));
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, runtime_1.Post)('/login'),
    (0, runtime_1.SuccessResponse)(200, 'Login successfull'),
    (0, runtime_1.Response)(401, 'Invalid credentials'),
    (0, runtime_1.Response)(403, 'Account is inactive'),
    errorHandler_1.asyncCatch,
    __param(0, (0, runtime_1.Body)()),
    __param(1, (0, runtime_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, runtime_1.Get)('/me'),
    (0, runtime_1.Security)("jwt"),
    (0, runtime_1.SuccessResponse)(200, 'User retrieve successfully'),
    (0, runtime_1.Response)(401, 'Unauthorized'),
    errorHandler_1.asyncCatch,
    __param(0, (0, runtime_1.Request)()),
    __param(1, (0, runtime_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, runtime_1.Post)('/signup'),
    (0, runtime_1.SuccessResponse)(201, 'User created successfully'),
    (0, runtime_1.Response)(400, 'Bad request, Validation Error'),
    (0, runtime_1.Response)(409, 'User already exists'),
    __param(0, (0, runtime_1.Body)()),
    __param(1, (0, runtime_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, runtime_1.Post)('/check-email'),
    (0, runtime_1.SuccessResponse)(200, 'Email check Successfull'),
    errorHandler_1.asyncCatch,
    __param(0, (0, runtime_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, runtime_1.Post)('/refresh'),
    (0, runtime_1.SuccessResponse)(200, 'Token refreshed successfully'),
    (0, runtime_1.Response)(401, 'Invalid refresh token'),
    __param(0, (0, runtime_1.Body)()),
    __param(1, (0, runtime_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, runtime_1.Post)('/logout'),
    (0, runtime_1.SuccessResponse)(200, 'Logout successful'),
    (0, runtime_1.Security)("jwt"),
    errorHandler_1.asyncCatch,
    __param(0, (0, runtime_1.Request)()),
    __param(1, (0, runtime_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, runtime_1.Route)('api/auth'),
    (0, runtime_1.Tags)('Authentication')
], AuthController);
//# sourceMappingURL=auth.js.map