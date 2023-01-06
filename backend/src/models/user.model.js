const tbl = require('./TableName')
const  Sequelize = require('sequelize');
const sequelize = require('../db/db-connection')

    const Users = sequelize.define(tbl.TBL_USER, {
        id: {
            type: Sequelize.INTEGER(50),
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        }, 
        username: {
            type: Sequelize.STRING(100),     
            trim: true,
            
        },
        mobileNo: {
            type: Sequelize.STRING(15),     
            trim: true,
            unique: true,
            allowNull:false,
        },
        email:{
            type:Sequelize.STRING(150),
            trim: true,
            unique: true,
            allowNull:false,
        },
        password: {
            type: Sequelize.STRING(255),     
            trim: true,
        },
        verified_by:{
            type: Sequelize.ENUM('Mobile','Email'),     
        },
        veification_status:{
            type: Sequelize.BOOLEAN,
        },
        name:{
            type:Sequelize.STRING(150),
        },
        dob:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        anniversary_date:{
            type:Sequelize.DATE,
            allowNull:true,
        },
        address:{
            type:Sequelize.STRING(255),
        },
        gender:{
            type:Sequelize.STRING(100),
            trim: true,
        },
        profile_image:{
            type:Sequelize.STRING(150),
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue:0
        }
    })

    module.exports = Users;
