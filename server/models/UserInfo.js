module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define("UserInfo", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'usersInfo'
    });

    // UserInfo.associate = (models) => {
    //     UserInfo.hasMany(models.Address, {
    //         foreignKey: "userId",
    //         onDelete: "cascade"
    //     });
    // };

    return UserInfo;
}
