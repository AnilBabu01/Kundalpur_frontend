const { Op, QueryTypes } = require("sequelize");
const sequelize = require("../db/db-connection");
const db = require("../models");
const bcrypt = require("bcryptjs");
const uploadimage = require("../middlewares/imageupload");
const removefile = require("../middlewares/removefile");
const TblUser = db.userModel;
const TblOTP = db.otpModel;
const TblUsersRoles = db.usersRolesModel;
const TblPasswordReset = db.passwordReset;
const TblEmployees = db.employees;
const TblAdmin = db.admin;

class UserCollaction {
  updatePassword = async (body) => {
    const { identity, new_password } = body;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(new_password, salt);

    const update = await TblUser.update(
      { password: hashencrypt },
      {
        where: {
          roles: "user",
          [Op.or]: [
            { username: identity },
            { email: identity },
            { mobileNo: identity },
          ],
        },
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return update[0];
  };

  selfRegister = async (body) => {
    let password = "abcd@1029";
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);

    const addNew = await TblUser.create({
      username: body.mobile_no,
      mobileNo: body.mobile_no,
      password: hashencrypt,
      email: "",
    })
      .then(async (res) => {
        console.log(res.id);
        await TblUsersRoles.create({
          user_id: res.id,
          role_id: 2,
        })
          .then((resp) => {
            res.dataValues["item_details"] = resp;
          })
          .catch((err) => {
            console.log("err entered", err);
          });
        return res.id;
      })
      .catch((err) => {});

    return addNew;
  };

  createuser = async (body, file) => {
    const { username, mobileNo, name, email, gender, password } = body;
    const { profile_image } = file;
    const imagePath = uploadimage(profile_image);

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);
    try {
      const query = await TblAdmin.create({
        username,
        mobileNo,
        name,
        email,
        gender,
        profile_image: imagePath,
        password: hashencrypt,
      }).then(async (res) => {
        const addRole = await TblUsersRoles.create({
          user_id: res.id,
          role_id: 1,
        });
      });

      return query;
    } catch (err) {
      console.log(err);
    }
  };

  updateOTP = async (id, otp) => {
    const check = await TblOTP.findOne({ where: { user_id: id } });
    if (check) {
      //---------update OTP-------
      const result = await TblOTP.update(
        { otp: otp },
        { where: { user_id: id } }
      );
      return result;
    } else {
      //--------insert new data--------
      const result = await TblOTP.create({ user_id: id, otp: otp });
      return result;
    }
  };

  generateResetToken = async (token, id) => {
    let resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    let data = await TblPasswordReset.update(
      {
        resetPasswordOtp: null,
        resetPasswordToken: token,
        resetPasswordExpires: resetPasswordExpires,
      },
      { where: { user_id: id } }
    ).catch((Err) => {
      console.log(Err);
    });

    console.log(data);
    return token;
  };

  generateResetTokenNew = async (token, id) => {
    let resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    let data = await TblPasswordReset.create({
      user_id: id,
      resetPasswordOtp: null,
      resetPasswordToken: token,
      resetPasswordExpires: resetPasswordExpires,
    }).catch((Err) => {
      console.log(Err);
    });

    console.log(data);
    return token;
  };

  resetPassword = async (body, id) => {
    const { identity, new_password, token } = body;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(new_password, salt);
    await TblUser.update({ password: hashencrypt }, { where: { id: id } });
    await TblPasswordReset.update(
      { resetPasswordToken: null, resetPasswordExpires: null },
      { where: { user_id: id } }
    );
    return true;
  };

  updateProfile = async (req) => {
    const { name, email, dob, anniversary_date, address } = req.body;
    console.log(req.body);
    const salt = bcrypt.genSaltSync(12);

    const userId = req.user.id;
    const user = await TblUser.findByPk(userId);

    //------check old pick and remove----
    removefile(user.profile_image);
    // ----********--------------------

    const { profile_image } = req?.files;

    const imagePath = uploadimage(profile_image);
    console.log(imagePath.replace("/uploads"));

    user.name = name;
    user.email = email;
    user.dob = dob;
    user.anniversary_date = anniversary_date;
    user.address = address;
    user.profile_image = imagePath;
    return user.save();
  };

  profileList = async (req) => {
    const userId = req.user.id;
    const user = await TblUser.findOne({
      where: { id: userId, is_deleted: false },
      attributes: [
        "id",
        "username",
        "mobileNo",
        "email",
        "name",
        "dob",
        "anniversary_date",
        "address",
        "gender",
        "profile_image",
      ],
    });
    return user;
  };

  checkMobile = async (mobile) => {
    const query = await sequelize.query(
      `SELECT * FROM tbl_users WHERE mobileNo = '${mobile}' `,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return query;
  };

  checkEmployeeMobile = async (mobile) => {
    const query = await sequelize.query(
      `SELECT * FROM tbl_employees WHERE Mobile = '${mobile}' `,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return query;
  };

  checkEmail = async (email) => {
    console.log(email);
    const query = await sequelize.query(
      `SELECT * FROM tbl_users WHERE Email = '${email}' `,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return query;
  };

  checkEmployeeEmail = async (email) => {
    console.log(email);
    const query = await sequelize.query(
      `SELECT * FROM tbl_employees WHERE email = '${email}' `,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return query;
  };

  createAccount = async (req) => {
    const { fullname, mobileno, email, password } = req.body;

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);

    const query = await TblUser.create({
      username: mobileno,
      mobileNo: mobileno,
      name: fullname,
      email,
      password: hashencrypt,
    });

    if (query) {
      const addRole = await TblUsersRoles.create({
        user_id: query.id,
        role_id: 2,
      });
      return query;
    }
    return null;
  };

  getUsers = async (req) => {
    let { id, phone, name } = req?.query;

    let users;
    if (phone || name) {
      console.log("enm");
      users = await TblUser.findAll({
        where: {
          [Op.or]: {
            mobileNo: { [Op.like]: "%" + phone + "%" },
            name: { [Op.like]: "%" + name + "%" },
          },
        },
        attributes: [
          "id",
          "username",
          "mobileNo",
          "email",
          "verified_by",
          "veification_status",
          "name",
          "dob",
        ],
        include: [
          {
            model: TblUsersRoles,
            as: "roleDetails",
            where: {
              role_id: 2,
            },
          },
        ],
      });
    } else if (!id && !phone && !name) {
      users = await TblUser.findAll({
        attributes: [
          "id",
          "username",
          "mobileNo",
          "email",
          "verified_by",
          "veification_status",
          "name",
          "dob",
        ],
        include: [
          {
            model: TblUsersRoles,
            as: "roleDetails",
            where: {
              role_id: 2,
            },
          },
        ],
      });
    } else {
      users = await TblUser.findAll({
        where: {
          id: id,
        },
        attributes: [
          "id",
          "username",
          "mobileNo",
          "email",
          "verified_by",
          "veification_status",
          "name",
          "dob",
        ],
        include: [
          {
            model: TblUsersRoles,
            as: "roleDetails",
            where: {
              role_id: 2,
            },
          },
        ],
      });
    }

    return users;
  };

  delUser = async (req) => {
    const { id } = req.query;
    const user = await TblUser.destroy({
      where: {
        id: id,
      },
      include: [
        {
          model: TblUsersRoles,
          as: "roleDetails",
          where: {
            role_id: 2,
          },
        },
      ],
    });
    return user;
  };

  editUser = async (req) => {
    const { id, name, email, mobile, password } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(password, salt);
    console.log(req.body);
    const user = await TblUser.update(
      { name: name, email: email, mobileNo: mobile, password: hashencrypt },
      { where: { id: id } }
    );
    console.log(user);
    return user;
  };

  addEmployees = async (req) => {
    const {
      Username,
      Mobile,
      Email,
      Address,
      Password,
      DmaxPTD,
      MaxPDA,
      Role,
      Rid,
      Cashier,
      Status,
      cancelCheckout,
      CreditAA,
      DebitAA,
      DCreditAA,
    } = req.body;

    const salt = bcrypt.genSaltSync(12);
    const hashencrypt = bcrypt.hashSync(Password, salt);
    const query = await TblEmployees.create({
      Username,
      Mobile,
      Email,
      Address,
      Password: hashencrypt,
      DmaxPTD,
      MaxPDA,
      Role,
      Rid,
      role_id: 3,
      Cashier,
      Status,
      cancelCheckout,
      CreditAA,
      DebitAA,
      DCreditAA,
    })
      .then((res) => {
        console.log(query);
        return {
          status: true,
          data: query,
        };
      })
      .catch((err) => {
        return {
          status: false,
          data: err,
        };
      });

    return query;
  };

  editEmployee = async (req, res) => {
    const {
      Username,
      id,
      Mobile,
      Email,
      Address,
      DmaxPTD,
      MaxPDA,
      Role,
      Rid,
      Cashier,
      Status,
      cancelCheckout,
      CreditAA,
      DebitAA,
      DCreditAA,
    } = req.body;

    const employees = await TblEmployees.update(
      {
        Username: Username,
        Mobile: Mobile,
        Email: Email,
        Address: Address,
        DmaxPTD: DmaxPTD,
        MaxPDA: MaxPDA,
        Role: Role,
        Cashier: Cashier,
        Status: Status,
        cancelCheckout: cancelCheckout,
        CreditAA: CreditAA,
        DebitAA: DebitAA,
        Rid:Rid,
        DCreditAA: DCreditAA,
      },
      {
        where: {
          id: id,
        },
      }
    ).catch((Err) => {
      console.log(Err);
    });
    console.log(employees);
    return employees;
  };

  getEmployees = async (req) => {
    const { id, name, phone } = req.query;
    let data;

    if (name || phone) {
      data = await TblEmployees.findAll({
        where: {
          [Op.or]: {
            Mobile: { [Op.like]: "%" + phone + "%" },
            Username: { [Op.like]: "%" + name + "%" },
          },
        },
        attributes: [
          "id",
          "Username",
          "Mobile",
          "Email",
          "Address",
          "DmaxPTD",
          "MaxPDA",
          "Role",
          "Rid",
          "Cashier",
          "Status",
          "cancelCheckout",
          "CreditAA",
          "DebitAA",
          "DCreditAA",
        ],
      });
    } else if (id) {
      data = await TblEmployees.findAll({
        where: { id: id },
        attributes: [
          "id",
          "Username",
          "Mobile",
          "Email",
          "Address",
          "DmaxPTD",
          "MaxPDA",
          "Role",
          "Rid",
          "Cashier",
          "Status",
          "cancelCheckout",
          "CreditAA",
          "DebitAA",
          "DCreditAA",
        ],
      });
    } else {
      data = await TblEmployees.findAll({
        attributes: [
          "id",
          "Username",
          "Mobile",
          "Email",
          "Address",
          "DmaxPTD",
          "MaxPDA",
          "Role",
          "Rid",
          "Cashier",
          "Status",
          "cancelCheckout",
          "CreditAA",
          "DebitAA",
          "DCreditAA",
        ],
      });
    }

    return data;
  };

  delEmployees = async (req) => {
    const id = req.query.id;

    let user = await TblEmployees.destroy({
      where: {
        id: id,
      },
    });

    return user;
  };

  //end of user collection
}

module.exports = new UserCollaction();
