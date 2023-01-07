const tbl = require("./TableName");
const Sequelize = require("sequelize");
const sequelize = require("../db/db-connection");


const donationTypes = sequelize.define(tbl.TBL_DONATION_TYPES,{
    id: {
        type: Sequelize.INTEGER(50),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
     type_en:{
        type: Sequelize.STRING(120),
        allowNull: false,
     } ,
     type_hi:{
        type: Sequelize.STRING(120),
        allowNull: false,
     }

})

module.exports = donationTypes