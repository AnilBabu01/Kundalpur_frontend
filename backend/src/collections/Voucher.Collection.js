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
}

module.exports = new voucherCollection();
