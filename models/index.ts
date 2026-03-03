import sequelize from "../config/database";
import Permission from "./permissions";
import Role from "./roles";
import UserRole from "./userRole";
import User from "./users";
import BlacklistedToken from "./blacklistedToken";

// Centralized associations  of all models for easy import in other parts of the application
User.belongsToMany(Role,{
    through:UserRole,
    as:'roles',
    foreignKey:'userId',
    otherKey:'roleId',
});
Role.belongsToMany(User,{
    through:UserRole,
    as:'users',
    foreignKey:'roleId',
    otherKey:'userId',
});

Role.belongsToMany(Permission,{
    through:'role_permissions',
    as:'permissions',
    foreignKey:'roleId',
    otherKey:'permissionId',
});

Permission.belongsToMany(Role,{
    through:'role_permissions',
    as:'roles',
    foreignKey:'permissionId',
    otherKey:'roleId',
});

const db = {
    sequelize,
    User,
    Role,
    Permission,
    UserRole,
    BlacklistedToken,
};

export default db;