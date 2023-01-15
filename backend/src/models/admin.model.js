const tbl = require("./TableName");
const Sequelize = require("sequelize");
const sequelize = require("../db/db-connection");

const Admin = sequelize.define(tbl.TBL_ADMIN, {
  id: {
    type: Sequelize.INTEGER(50),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(100),
    trim: true,
    unique: true,
    
  },
  mobileNo: {
    type: Sequelize.STRING(15),
    trim: true,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(150),
    trim: true,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    trim: true,
  },

  name: {
    type: Sequelize.STRING(150),
  },


  gender: {
    type: Sequelize.STRING(100),
    trim: true,
  },
  profile_image: {
    type: Sequelize.STRING(150),
  }
  
});

module.exports = Admin;
