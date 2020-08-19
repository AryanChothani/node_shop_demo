module.exports = (sequelize, Sequelize) => {
    const Quatation = sequelize.define('quatation', {
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        city: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        date: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        items: {
            type: Sequelize.JSON,
            notEmpty: true
        },
        cgst: {
            type: Sequelize.STRING,
            notEmpty: false
        },
        sgst: {
            type: Sequelize.STRING,
            notEmpty: false
        },
        transport: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        packing: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        other: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        total: {
            type: Sequelize.STRING,
            notEmpty: false
        }
    });
    return Quatation;
}