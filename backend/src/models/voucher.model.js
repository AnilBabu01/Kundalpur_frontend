const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

const vouchers = sequelize.define(tbl.TBL_VOUCHERS,{
    id:{
        type: Sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
    },
    vPrefix:{
        type: Sequelize.STRING(100),
        defaultValue:''
    },
    from:{
        type: Sequelize.STRING(100), 
        allowNull:false,
    },
    to:{
        type: Sequelize.STRING(100),
        allowNull:false,
    },
    assign:{
        type: Sequelize.STRING(100),
        allowNull:false,
    },
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
})


module.exports = vouchers

