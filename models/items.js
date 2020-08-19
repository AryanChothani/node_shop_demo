module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define('items', {
        user_id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        mo_no: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        address: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        city: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        item_type: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        photo: {
            type: Sequelize.TEXT('medium'),
            notEmpty: true
        },
        item_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        items_params: {
            type: Sequelize.JSON,
            notEmpty: true
        }
    });
    return Items;
}