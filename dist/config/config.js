"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key', // Change this to a secure secret in production
        expiresIn: '1d',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        databaseName: process.env.DB_NAME || "",
        dialect: "mysql",
        logging: false,
    },
    bcryptSalRounds: 10, // Number of salt rounds for bcrypt hashing
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    frontendUrl: process.env.VITE_APP_URL || 'http://localhost:3000',
    cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
    isDev: process.env.NODE_ENV === 'development',
    host: process.env.HOST || 'localhost',
};
exports.default = config;
//# sourceMappingURL=config.js.map