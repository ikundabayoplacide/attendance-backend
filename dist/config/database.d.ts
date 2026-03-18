import { Sequelize } from "sequelize";
declare const sequelize: Sequelize;
export declare const initializeDatabase: () => Promise<{
    success: boolean;
    error?: any;
}>;
export default sequelize;
