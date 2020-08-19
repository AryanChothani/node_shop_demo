module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        mo_no: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        user_type: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return User;
}