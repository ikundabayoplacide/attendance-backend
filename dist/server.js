"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//Trach database connection status
let dbconnected = false;
let dbConnectionError = null;
// Initialize database connection
(0, database_1.initializeDatabase)()
    .then(() => {
    dbconnected = true;
    console.log("Database connected successfully.");
})
    .catch((error) => {
    dbConnectionError = error;
    console.error("Database connection failed:", error);
});
// cross origins for security
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000",
    "https://backend.eac-se.com",
    "https://one.eac-se.com",
    "http://localhost:8080",
    "http://localhost:5173"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin))
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const message = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(message), false);
        }
        else {
            return callback(null, true);
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ["set-cookie"],
}));
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//Swagger setup
const routes_1 = require("./generated/routes");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => {
    return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require("./public/swagger.json")))));
});
//Root route-shows status without redirect
app.get("/", (req, res) => {
    if (!dbconnected) {
        return res.status(503).json({
            status: "error",
            message: "Database connection failed",
            error: dbConnectionError ? dbConnectionError.message : "Unknown error",
            timestamp: new Date().toISOString(),
        });
    }
    res.json({
        version: "1.0.0",
        name: "Attendance Management API",
        database: dbconnected ? "Connected" : "Disconnected",
        documentation: "/docs",
        status: "success",
        message: "API is running",
        timestamp: new Date().toISOString(),
    });
});
//Register TSOA-generated routes
(0, routes_1.RegisterRoutes)(app);
const [notFoundHandler, errorHandler, errorLogger] = (0, errorHandler_1.default)();
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);
exports.default = app;
//# sourceMappingURL=server.js.map