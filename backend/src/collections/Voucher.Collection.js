const sequelize = require("../db/db-connection");
const db = require("../models");
const TblVoucher = db.Vouchers;

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
        status: 0,
      },
    });

    AssignedVoucher.map(async (item) => {
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
          if (voucherNumber[0] < item.from && voucherNumber[0] > item.to) {  //change the status of voucher into 1 if the voucher number
                                                                              // is greater than and less than the from and to
            await TblVoucher.update({ status: 1 }, { where: item.id });
          }
          return {
            status: false,
            message: "User is not allowed to Download",
          };
        }
      } else {
        return {
          status: false,
          message: "Voucher Prefix is not Matching",
        };
      }
    });

  };
}

module.exports = new voucherCollection();
