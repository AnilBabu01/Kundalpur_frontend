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
    console.log(userId)
    const { voucher } = req.body;

    const currentYear = new Date().getFullYear()

    let voucherNumber = voucher.match(/(\d+)/)
    let prefix = voucher.match(/[a-zA-Z]/g).join('' )
    console.log(prefix)

    let AssignedVoucher = await TblVoucher.findAll({
      where: {
        assign: userId,
        status: 0
      },
    });

    AssignedVoucher.map((item)=>{
      if(item.vPrefix == prefix){
        if((voucherNumber[0] >= currentYear+item.from)   && voucherNumber[0] <= (currentYear+item.to)  ){
          return {
            status: true,
            message: "User has been assigned"
          };
        }else{
          return {
            status: false,
            message: "User is not allowed to Download"
          };
        }
      }else{
        return {
          status: false,
          message: "Voucher Prefix is not Matching"
        };
      }
    })

    return {
      status: true,
      message: "User has been assigned",
      data: AssignedVoucher,
    };
  };
}

module.exports = new voucherCollection();
