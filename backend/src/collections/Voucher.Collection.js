const { request } = require("express");
const sequelize = require("../db/db-connection");
const db = require("../models");
const TblVoucher = db.Vouchers;
const TblEmployee = db.employees;
const TblEmpRoles = db.empRoles;

class voucherCollection {
  generateVoucher = async (req) => {
    const { vPrefix, from, to, user } = req.body;

    const voucher = await TblVoucher.create({
      vPrefix: vPrefix,
      from: from,
      to: to,
      assign: user,
    })
      .then((res) => {
        return {
          message: res,
        };
      })
      .catch((err) => {
        return {
          message: err,
        };
      });
    return voucher;
  };

  checkVoucher = async (req) => {
    const userId = req.user.id;
    console.log(userId);
    const { voucher } = req.body; // here get The VoucherNumber that needs to be checked

    const currentYear = new Date().getFullYear();

    let voucherNumber = voucher.match(/(\d+)/); // extracting NUMBER ONLY 2023002 FROM Elec20230002 (just an example)
    let prefix = voucher.match(/[a-zA-Z]/g).join(""); // Extracting the prefix  Elec from the Elec20230002

    let AssignedVoucher = await TblVoucher.findAll({
      //geting the assigned voucherrss
      where: {
        assign: userId,
      },
    });

    AssignedVoucher.map(async (item) => {
      if (prefix) {
        if (item.vPrefix == prefix) {
          //checking prefix is matched
          if (
            voucherNumber[0] >= currentYear + item.from &&
            voucherNumber[0] <= currentYear + item.to
          ) {
            //checking the voucher is greater than the assignedfrom and lessthan the assigned to
            return {
              status: true,
              message: "User has been assigned",
            };
          } else {
            return {
              status: false,
              message:
                "User is not allowed to Download please Request to Allot more Vouchers",
            };
          }
        } else {
          return {
            status: false,
            message: "Voucher Prefix is not Matching",
          };
        }
      } else {
        if (
          voucherNumber[0] >= currentYear + item.from &&
          voucherNumber[0] <= currentYear + item.to
        ) {
          //checking the voucher is greater than the assignedfrom and lessthan the assigned to
          return {
            status: true,
            message: "User has been assigned",
          };
        } else {
          return {
            status: false,
            message:
              "User is not allowed to Download please Request to Allot more Vouchers",
          };
        }
      }
    });
  };

  getVoucher = async () => {
    const voucher = await TblVoucher.findAll();

    return voucher;
  };

  requestVoucher = async (req) => {
    const id = req.user.id;

    const Voucher = await TblEmployee.update(
      {
        isRequest: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return Voucher;
  };

  getrequestVoucher = async (req) => {
    const request = await TblEmployee.findAll({
      where: {
        isRequest: true,
      },
      attributes: ["id", "Username", "Role"],
    });
    return request;
  };

  EmployeeRole = async (req) => {
    const {
      roleName,
      roleDesc,
      DAdd,
      DDel,
      Dedt,
      Denq,
      RAdd,
      RDel,
      Redt,
      Renq,
    } = req.body;

    const roles = await TblEmpRoles.create({
      roleName,
      roleDesc,
      DAdd,
      DDel,
      Dedt,
      Denq,
      RAdd,
      RDel,
      Redt,
      Renq,
    }).catch((err)=>{
      console.error(err);
    })

    return roles
  };
}

module.exports = new voucherCollection();
