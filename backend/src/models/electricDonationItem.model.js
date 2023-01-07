const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const elecDonationitem = sequelize.define(tbl.TBL_ELEC_DONATION_ITEM, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        },
        donationId:{
            type: Sequelize.INTEGER(50),
            allowNull:false,
        },
        type: {
            type: Sequelize.TEXT(),
            allowNull:false,
        },
        amount: {
            type: Sequelize.FLOAT(10,2),
            allowNull:false,
        },
        remark: {
            type: Sequelize.STRING(255),
            allowNull:false,
        }
    })
    module.exports = elecDonationitem;