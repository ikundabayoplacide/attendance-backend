"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jose_1 = require("jose");
const config_1 = __importDefault(require("../config/config"));
//Get JWT secret from config
const secret = new TextEncoder().encode(config_1.default.jwt.secret);
/**
 * Generate a JWT token
 * @param payload Token payload
 * @param expiresIn Expiration time in seconds (default: 1 day for access, 7 days for refresh)
 * @returns Signed JWT token
 */
async function generateToken(payload, expiresIn) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + expiresIn;
    return new jose_1.SignJWT({ ...payload, iat, exp })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(secret);
}
/**
 * Verify a JWT token
 * @param token JWT token to verify
 * @param expectedType Expected token type (access or refresh)
 * @returns Decoded token payload if valid
 * @throws If token is invalid or expired
 */
async function verifyToken(token, expectedType) {
    try {
        const { payload } = await (0, jose_1.jwtVerify)(token, secret, {
            algorithms: ['HS256'],
            ...(expectedType && { typ: 'JWT' })
        });
        const typedPayload = payload;
        if (expectedType && typedPayload.type !== expectedType) {
            throw new Error(`Invalid token type. Expected ${expectedType}, got ${typedPayload.type}`);
        }
        return typedPayload;
    }
    catch (error) {
        console.error('JWT Verify Error Details:', error);
        if (error instanceof Error) {
            if (error.message.includes('expired')) {
                throw new Error('Token has expired');
            }
            if (error.message.includes('signature')) {
                throw new Error('Invalid token signature');
            }
            throw error;
        }
        throw new Error('Invalid token');
    }
}
//# sourceMappingURL=jwt.js.map