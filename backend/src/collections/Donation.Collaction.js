const { sequelize, QueryTypes, query } = require("sequelize");
const uploadimage = require("../middlewares/imageupload");
const db = require("../models");
const electricDonation = require("../models/electricDonation.model");
const { TBL_VOUCHERS, TBL_ELEC_DONATION_ITEM } = require("../models/TableName");
db.donationModel.hasMany(db.donationItem, {
  foreignKey: "donationId",
  as: "itemDetails",
});
db.donationItem.belongsTo(db.donationModel, {
  foreignKey: "donationId",
  as: "donationDetail",
});

/// electric donation relationship
db.ElecDonationModel.hasMany(db.ElecDonationItem, {
  foreignKey: "donationId",
  as: "elecItemDetails",
});
db.ElecDonationItem.belongsTo(db.ElecDonationModel, {
  foreignKey: "donationId",
  as: "elecDonationDetail",
});
/// electric donation relationship

const TblDonation = db.donationModel;
const TblDonationItem = db.donationItem;
const itemList = db.itemList;
const TblNewDonation = db.newDonationModel;
const TblelecDonation = db.ElecDonationModel;
const TblelecDonationItem = db.ElecDonationItem;
const TblDonationTypes = db.donationTypes;
const TblVouchers = db.Vouchers;

class DonationCollaction {
  addNewDonation = async (req) => {
    const {
      NAME,
      MODE_OF_DONATION,
      AMOUNT,
      CHEQUE_NO,
      DATE_OF_CHEQUE,
      NAME_OF_BANK,
      PAYMENT_ID,
      DATE_OF_DAAN,
      TYPE,
      REMARK,
      ADDRESS,
    } = req.body;

    let IMG = "";

    let active = "";
    const count = await TblNewDonation.count();
    const currentYear = new Date().getFullYear();
    let donationType = "ONLINE";

    if (MODE_OF_DONATION == 2) {
      const { chequeImg } = req.files;
      donationType = "CHEQUE";
      active = "0";
      IMG = uploadimage(chequeImg);
    }

    const receiptId = count + 1;
    let RECEIPT_NO = `${donationType}-${currentYear}-000${receiptId}`;
    const userId = req.user.id;
    const result = await TblNewDonation.create({
      NAME,
      RECEIPT_NO,
      MODE_OF_DONATION: donationType,
      AMOUNT,
      CHEQUE_NO,
      DATE_OF_CHEQUE,
      NAME_OF_BANK,
      PAYMENT_ID,
      TYPE,
      ADDRESS,
      REMARK,
      IMG,
      active,
      DATE_OF_DAAN,
      ADDED_BY: userId,
    }).catch((err) => {
      console.log(err);
    });
    console.log(result);
    if (!result) {
      return null;
    }
    return true;
  };

  adddonation = async (req, receiptNo) => {
    const {
      name,
      phoneNo,
      address,
      new_member,
      donation_date,
      donation_time,
      donation_item,
    } = req.body;
    const userId = req.user.id;
    const result = await TblDonation.create({
      name,
      phoneNo,
      receiptNo,
      address,
      new_member,
      donation_date,
      donation_time,
      created_by: userId,
    })
      .then(async (res) => {
        let final = [];
        donation_item.forEach((e) => {
          final.push({
            donationId: res.id,
            itemId: e.item,
            amount: e.amount,
            remark: e.remark,
          });
        });
        await TblDonationItem.bulkCreate(final).then((resp) => {
          res.dataValues["item_details"] = resp;
        });
        return {
          status: 1,
          message: "Created Successfully",
          data: res.dataValues,
        };
      })
      .catch((err) => {
        return {
          status: 1,
          message: "Something wrong!",
          data: res.err,
        };
      });
    return result;
  };

  delDonation = async (req) => {
    let { id, mode } = req.query;

    if (mode == 2) {
      mode = "CHEQUE";
    } else {
      mode = "ONLINE";
    }

    console.log(mode, id);
    const result = await TblNewDonation.destroy({
      where: {
        id: id,
        MODE_OF_DONATION: mode,
      },
    })
      .then((res) => {
        console.log(res);
     
      })
      .catch((err) => {
        console.log(err, "err");
        return {
          status: 1,
          message: "Something wrong!",
        };
      });
    return result;
  };

  editDonation = async (req) => {
    const {
      NAME,
      MODE_OF_DONATION,
      AMOUNT,
      CHEQUE_NO,
      DATE_OF_CHEQUE,
      NAME_OF_BANK,
      PAYMENT_ID,
      DATE_OF_DAAN,
      TYPE,
      REMARK,
      ADDRESS,
      ID,
    } = req.body;

    let mode;
    let IMG = "";

    if (MODE_OF_DONATION == 1) {
      mode = "ONLINE";
    } else {
      const { chequeImg } = req.files;

      IMG = uploadimage(chequeImg);
      mode = "CHEQUE";
    }

    let result = await TblNewDonation.update(
      {
        NAME: NAME,
        AMOUNT: AMOUNT,
        CHEQUE_NO: CHEQUE_NO,
        DATE_OF_CHEQUE: DATE_OF_CHEQUE,
        NAME_OF_BANK: NAME_OF_BANK,
        PAYMENT_ID: PAYMENT_ID,
        DATE_OF_DAAN: DATE_OF_DAAN,
        TYPE: TYPE,
        REMARK: REMARK,
        ADDRESS: ADDRESS,
        IMG: IMG,
      },

      {
        where: {
          id: ID,
          MODE_OF_DONATION: mode,
        },
      }
    );
    return result;
  };

  delElecDonation = async (req) => {
    let id = req.query.id;
    console.log(id);

    let deleteReq = await TblelecDonation.destroy({
      where: {
        id: id,
      },
    })
      .then(async (res) => {
        await TblelecDonationItem.destroy({
          where: {
            donationId: id,
          },
        });
        return {
          status: 1,
          message: "deleted successfully",
        };
      })
      .catch((err) => {
        return {
          status: 1,
          message: "Something went wrong",
        };
      });
    return deleteReq;
    console.log(deleteReq);
  };

  addElecDonation = async (req, voucherNo,receipt) => {
    try {
      const {
        name,
        phoneNo,
        prefix,
        address,
        new_member,
        donation_date,
        donation_time,
        donation_item,
      } = req.body;
      console.log(req.body);
      const userId = req.user.id;

      const ReceiptNo = `${prefix}${receipt}`
      console.log(ReceiptNo);
      const result = await TblelecDonation.create({
        name,
        phoneNo,
        address,
        voucherNo,
        ReceiptNo,
        new_member,
        donation_date,
        donation_time,
        donation_item,
        created_by: userId,
      })
        .then(async (res) => {
          let ElecDonationItems = [];
          donation_item.forEach((e) => {
            ElecDonationItems.push({
              donationId: res.id,
              type: e.type,
              amount: e.amount,
              remark: e.remark,
            });
          });
          await TblelecDonationItem.bulkCreate(ElecDonationItems).then(
            (resp) => {
              res.dataValues["item_details"] = resp;
            }
          );
          return {
            status: 1,
            message: "Created Successfully",
            data: res.dataValues,
          };
        })
        .catch((err) => {
          return {
            status: 1,
            message: "Something wrong!",
            data: err,
          };
        });

      return result;
    } catch (err) {
      return {
        status: 1,
        message: err,
      };
    }
  };

  editElecDonation = async (req) => {
    const {
      id,
      name,
      phoneNo,
      address,
      new_member,
      donation_date,
      donation_time,
      donation_item,
    } = req.body;
    const userId = req.user.id;

    const result = await TblelecDonation.update(
      {
        name: name,
        phoneNo: phoneNo,
        address: address,
        new_member: new_member,
        donation_date: donation_date,
        donation_time: donation_time,
      },
      {
        where: {
          created_by: userId,
          id: id,
        },
      }
    ).then(async () => {
      donation_item.forEach(async (e) => {
        let items = await TblelecDonationItem.update(
          {
            type: e.type,
            amount: e.amount,
            remark: e.remark,
          },

          {
            where: {
              donationId: id,
              id: e.id,
            },
          }
        );
      });

      return {
        status: 1,
        message: "Updated Successfully",
      };
    });

    return result;
  };

  getElecDonation = async (req) => {
    const userId = req.user.id;
    const { phone, name } = req.query;

    if (phone && name) {
      let data = await TblelecDonation.findAll({
        where: {
          created_by: userId,
          phoneNo: phone,
          name: name,
        },
        include: [
          {
            model: TblelecDonationItem,
            as: "elecItemDetails",
          },
        ],
      });
      return data;
    } else {
      let data = await TblelecDonation.findAll({
        where: { created_by: userId },
        include: [
          {
            model: TblelecDonationItem,
            as: "elecItemDetails",
          },
        ],
      });
      return data;
    }
  };

  getElecDonationbyId = async (req) => {
    let id = req.query.id;
    const userID = req.user.id;
    let data = await TblelecDonation.findOne({
      where: { created_by: userID, id: id },
      include: [
        {
          model: TblelecDonationItem,
          as: "elecItemDetails",
        },
      ],
    });
    console.log(data);
    return data;
  };

  getLastID = async () => {
    const lastID = await TblDonation.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
    });
    return lastID ? lastID.id : 1;
  };

  getElecLastID = async () => {
    const lastID = await TblelecDonation.findOne({
      order: [["id", "DESC"]],
      attributes: ["id"],
    });
    return lastID ? lastID.id : 1;
  };

  donationRecord = async (req) => {
    const userId = req.user.id;
    const record = await TblDonation.findAll({
      where: { created_by: userId },
      attributes: [
        "id",
        "receiptNo",
        "name",
        "phoneNo",
        "address",
        "new_member",
        "donation_date",
        "donation_time",
      ],
      include: [
        {
          model: TblDonationItem,
          as: "itemDetails",
          attributes: ["itemId", "amount", "remark"],
        },
      ],
    });
    return record;
  };

  newDonationRecord = async (req) => {
    const userId = req.user.id;
    const record = await TblNewDonation.findAll({
      where: { ADDED_BY: userId },
      // attributes:['id','receiptNo','name','phoneNo','address','new_member','donation_date','donation_time'],
    });
    return record;
  };

  allDonationRecord = async (req) => {
    const record = await TblNewDonation.findAll();
    return record;
  };

  getItemList = async () => {
    const list = await itemList.findAll({
      attributes: ["id", "item_name"],
      where: { is_deleted: null },
    });
    return list;
  };

  addDonationType = async (req) => {
    const { type_en, type_hi } = req.body;

    const data = await TblDonationTypes.create({
      type_en,
      type_hi,
    });
    return data;
  };

  getDonationType = async () => {
    const data = await TblDonationTypes.findAll();
    return data;
  };

  delDonationType = async (req) => {
    let id = req.query.id;
    const data = await TblDonationTypes.destroy({
      where: {
        id: id,
      },
    });

    return data;
  };

  EditDonationType = async (req) => {
    let { id, type_en, type_hi } = req.body;

    const data = await TblDonationTypes.update(
      { type_en: type_en, type_hi: type_hi },
      {
        where: {
          id: id,
        },
      }
    );
    return data;
  };

  ChangeChequeStatus = async (req) => {
    const { status, id } = req.body;
    console.log(req.body);
    ///status 0 == false ///status 1 === true means active
    let data;

    if (status == 1) {
      data = await TblNewDonation.update(
        {
          active: "1",
        },
        {
          where: {
            id: id,
            MODE_OF_DONATION: "CHEQUE",
          },
        }
      ).catch((err) => {
        console.log(err);
      });
    } else if (status == 0) {
      data = await TblNewDonation.update(
        {
          active: "0",
        },
        {
          where: {
            id: id,
            MODE_OF_DONATION: "CHEQUE",
          },
        }
      ).catch((err) => {
        console.log(err);
      });
    }
    console.log(data);
    return data;
  };
}

module.exports = new DonationCollaction();
