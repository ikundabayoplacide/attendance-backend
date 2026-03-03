import Permission from "./permissions";
import Role from "./roles";
import UserRole from "./userRole";
import User from "./users";
import BlacklistedToken from "./blacklistedToken";
declare const db: {
    sequelize: import("sequelize").Sequelize;
    User: typeof User;
    Role: typeof Role;
    Permission: typeof Permission;
    UserRole: typeof UserRole;
    BlacklistedToken: typeof BlacklistedToken;
};
export default db;
