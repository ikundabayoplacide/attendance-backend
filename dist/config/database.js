"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
const sequelizeOptions = {
    host: config_1.default.database.host,
    port: config_1.default.database.port,
    dialect: config_1.default.database.dialect,
    logging: config_1.default.database.logging,
};
const sequelize = new sequelize_1.Sequelize(config_1.default.database.databaseName, config_1.default.database.user, config_1.default.database.password, sequelizeOptions);
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.info("Connection to the database has been established successfully.");
        return { success: true };
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        return { success: false, error };
    }
};
exports.initializeDatabase = initializeDatabase;
exports.default = sequelize;
//# sourceMappingURL=database.js.map