"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const server_1 = __importDefault(require("./server"));
const server = server_1.default.listen(config_1.default.port, "localhost", () => {
    const { nodeEnv, port } = config_1.default;
    console.log(`Server running in ${nodeEnv} mode on port http://localhost:${port}`);
});
const onCloseSignal = () => {
    console.log("Received shutdown signal, closing server...");
    server.close(() => {
        console.log("Server closed gracefully.");
        process.exit(0);
    });
    setTimeout(() => {
        console.log("Forcefully shutting down server.");
        process.exit(1);
    }, 5000).unref();
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
//# sourceMappingURL=index.js.map