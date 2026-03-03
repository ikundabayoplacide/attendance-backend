"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const syncDatabase = async () => {
    try {
        console.log("Starting database synchronization...");
        // Ensure connection is established
        await database_1.default.authenticate();
        console.log("Database connection established.");
        // Run sync with alter: true
        await database_1.default.sync({ alter: true });
        console.log("Database synchronized successfully.");
        process.exit(0);
    }
    catch (error) {
        console.error("Error synchronizing database:", error);
        process.exit(1);
    }
};
syncDatabase();
//# sourceMappingURL=db-sync.js.map