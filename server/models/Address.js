module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        block_no: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        street_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        postal_code: {
            type: DataTypes.INTEGER(6),
            allowNull: false
        },
        is_default: {
            type: DataTypes.BOOLEAN(),
            allowNull: false
        },

    }, {
        tableName: 'address'
    });

    // Address.associate = (models) => {
    //     Address.belongsTo(models.UserInfo, {
    //         foreignKey: "userId",
    //         as: 'user'
    //     });
    // };

    return Address;
}
