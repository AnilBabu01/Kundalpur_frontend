const tbl = require("./TableName");
const Sequelize = require("sequelize");
const sequelize = require("../db/db-connection");

const Employees = sequelize.define(tbl.TBL_EMPLOYEES, {
  id: {
    type: Sequelize.INTEGER(50),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Username: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  Mobile: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },

  Address: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  DmaxPTD: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  MaxPDA: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  Role: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  role_id:{
    type: Sequelize.INTEGER(50),   
    allowNull:false,
  },
  Cashier: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  Status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  cancelCheckout: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  CreditAA: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DebitAA: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DCreditAA:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Employees;
