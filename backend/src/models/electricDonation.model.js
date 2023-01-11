const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

const electricDonation  = sequelize.define(tbl.TBL_ELEC_DONATION,{
    id:{
        type: Sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
    },
    voucherNo:{
        type: Sequelize.STRING(150),
        allowNull:false,
    },
    ReceiptNo:{
        type: Sequelize.STRING(150),
        allowNull:false,
    },
    phoneNo: {
        type: Sequelize.STRING(15),     
        trim: true,
    },
    name: {
        type: Sequelize.STRING(150),     
        trim: true,
    },
    address: {
        type: Sequelize.STRING(255),     
        trim: true,
    },
    donation_date: {
        type: Sequelize.DATE,
        trim: true,
    },
    donation_time:{
        type:Sequelize.TIME,
        trim: true,
    },
    member : {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
    },
    created_by:{
        type:Sequelize.INTEGER(50),
        trim: true,
    },
    isActive:{
        type: Sequelize.BOOLEAN,
        defaultValue:true,
    }



})

module.exports = electricDonation