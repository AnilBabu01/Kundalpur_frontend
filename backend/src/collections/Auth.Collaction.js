const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const sequelize = require("../db/db-connection");

const TblUser = db.userModel;
const TblUsersRoles = db.usersRolesModel;
const TblOTP = db.otpModel;
const TblPasswordReset = db.passwordReset;
const TblEmployees = db.employees;
const TblAdmin = db.admin


db.userModel.hasOne(db.otpModel, { foreignKey: "user_id", as: "otpDetails" });
db.otpModel.belongsTo(db.userModel, { foreignKey: "user_id", as: "userOTP" });


db.userModel.hasOne(db.usersRolesModel, {
  foreignKey: "user_id",
  as: "roleDetails",
});

db.usersRolesModel.belongsTo(db.userModel, {
  foreignKey: "user_id",
  as: "userRole",
});

db.admin.hasOne(db.usersRolesModel, {
  foreignKey: "user_id",
  as: "adminDetails",
});


db.usersRolesModel.belongsTo(db.admin, {
  foreignKey: "user_id",
  as: "userRoles",
});





// db.roleModel.hasMany(db.usersRolesModel, {
//   foreignKey: "role_id",
//   as: "usersRoles",
// });
// db.usersRolesModel.belongsTo(db.roleModel, {
//   foreignKey: "role_id",
//   as: "roles",
// });

const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { UserCollection } = require(".");

class UserCollaction {
  getUserByEmail = async (email) => {
    let result = "";
    const query = await TblUser.findOne({
      where: {
        EMAIL: email,
      },
    }).then((res) => {
      result = res;
    });
    return result;
  };

  getUserDetails = async (identity) => {
    const userId = await TblUser.findOne({
      where: {
        [Op.or]: [
          { username: identity },
          { email: identity },
          { mobileNo: identity },
        ],
      },
    });

    if (userId) {
      let data = await TblUser.findOne({
        where: {
          [Op.or]: [
            { username: identity },
            { email: identity },
            { mobileNo: identity },
          ],
        },
        include: [
          {
            model: TblUsersRoles,
            as: "roleDetails",
            where: {
              user_id: userId.id,
              role_id: 2,
            },
          },
        ],
      });
      return data;
    }

    return null;
  };

  getUserName = async (username) => {
    const query = await TblUser.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username },
          { mobileNo: username },
        ],
      },
      include: [
        {
          model: TblUsersRoles,
          as: "roleDetails",
          where: { role_id: 2 },
        },
      ],
    });
    return query;
  };

  getAdminName = async (username) => {
    let result = "";
    const query = await TblAdmin.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: TblUsersRoles,
          as: "adminDetails",
          where: { role_id: 1 },
        },
      ],
    }).then((res) => {
      console.log(res);
      result = res;
    });

    return result;
  };

  getEmployee = async (email) => {
    let result = "";
    const query = await TblEmployees.findOne({
      where: {
        email: email,
      },
    }).then((res) => {
      result = res;
      result.roleDetails = { role_id: res.role_id };
    });

    return result;
  };

  isPasswordMatch = async function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  };

  isOTPMatch = async (username, otp) => {
    const data = await TblUser.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username },
          { mobileNo: username },
        ],
      },
      include: [
        {
          model: TblOTP,
          as: "otpDetails",
          attributes: ["otp"],
        },
      ],
    });

    if (data.otp != "" && data.otpDetails.dataValues.otp == otp) {
      await TblOTP.update({ otp: null }, { where: { user_id: data.id } });
      await TblUser.update(
        { veification_status: 1, verified_by: "Mobile" },
        { where: { id: data.id } }
      );
      return 1;
    }
    return 0;
  };

  checkOtpLastSend = async (id) => {
    const result = await TblOTP.findOne({
      // logging: (sql, queryObject) => {
      //   sendToElasticAndLogToConsole(sql, queryObject)
      // },
      where: {
        user_id: id,
        otp: {
          [Op.not]: null,
        },
      },
    });
    return result;
  };

  updateForgotPassToken = async (id, otp, expire) => {
    const record = await TblPasswordReset.findOne({ where: { user_id: id } });
    if (record) {
      const data = await TblPasswordReset.update(
        { resetPasswordOtp: otp, resetPasswordExpires: expire },
        { where: { user_id: id } }
      );
      return await TblPasswordReset.findOne({ where: { user_id: id } });
    } else {
      return TblPasswordReset.create({
        user_id: id,
        resetPasswordOtp: otp,
        resetPasswordExpires: expire,
      });
    }
  };

  forgotOTPMatch = async (body) => {
    const { identity } = body;
    const user = await this.getUserName(identity);
    const data = await TblPasswordReset.findOne({
      where: { user_id: user.id },
    });

    if (data.resetPasswordOtp == body.otp) {
      return {
        resetPasswordToken: data.resetPasswordToken,
        resetPasswordExpires: data.resetPasswordExpires,
        user_id: user.id,
      };
    }
    return null;
  };

  forgotPass = async (req) => {
    const id = req.user.id;

    const { oldpassword, newPassword } = req.body;
    let data;

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(newPassword, salt);

    const user = await TblUser.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Your not Authorized ");
    } else {
      let checkpass = await this.isPasswordMatch(oldpassword, user.password);
      console.log(checkpass);
      if (checkpass) {
        data = await TblUser.update(
          {
            password: hashencrypt,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      }
    }

    return data;
  };

  forgotPasswordReqOtp = async (req) => {
    const email = req.body.email;

    let user = await TblUser.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: TblUsersRoles,
          as: "roleDetails",
          where: { role_id: 2 },
        },
      ],
    });

    if (user) {
      // ---------check OTP TIME--------
      const checkOtpLastSend = await this.checkOtpLastSend(user.id);
      if (!checkOtpLastSend) {
        let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
        // sendSms(otp,body.mobile_no)
        const update_otp = await UserCollection.updateOTP(user.id, otp);
        return update_otp;
      } else {
        let date_ob = new Date();
        var seconds = 60;
        var parsedDate = new Date(Date.parse(checkOtpLastSend.updatedAt));
        var newDate = new Date(parsedDate.getTime() + 1000 * seconds);
        const remaining = date_ob - newDate;
        const checkRemaining = Math.floor((remaining / 1000) % 60);
        if (checkRemaining > 0) {
          //----check remaining time-----
          let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
          const update_otp = await UserCollection.updateOTP(user.id, otp);
          // sendSms(otp,body.mobile_no)
          return update_otp;
        } else {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            `Please wait ${Math.abs(checkRemaining)} seconds.`
          );
        }
      }
    }
    return {
      status: true,
      message: "Otp Will send to Your Registered Mail",
    };
  };

  changePassForgot =async (req)=>{

    const {token,password} = req.body;
let data;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);
    let verify = await TblPasswordReset.findOne({
      where:{resetPasswordToken:token}
    })

    if(verify){
     data = await TblUser.update({
        password:hashencrypt
      },
      {
        where:{
          id:verify.user_id
        }
      }
      ).catch((err)=>{
        console.log(err)
      }

      )
    }

    return data

  }

} //end of class

function sendToElasticAndLogToConsole(sql, queryObject) {
  // save the `sql` query in Elasticsearch
  console.log(sql);

  // use the queryObject if needed (e.g. for debugging)
}

module.exports = new UserCollaction();
