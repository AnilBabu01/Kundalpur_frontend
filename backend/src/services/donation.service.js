const httpStatus = require("http-status");
const { DonationCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

const generateReceiptNo = (lastID) => {
  const currentYear = new Date().getFullYear()
  let receiptNo = `CASH${currentYear}-0000${lastID+1}`
  return receiptNo;
}

const generateElcReceiptNo = (lastID) => {
  const currentYear = new Date().getFullYear()
  let receiptNo = `Elec${currentYear}-0000${lastID+1}`
  return receiptNo;
}




const addNewDonation = async(req)=>{
  const donation = await DonationCollection.addNewDonation(req);
  console.log(donation);
  return donation;
}

const addelecDonation = async(req)=>{
  const lastID = await DonationCollection.getElecLastID();
  const receiptNo = generateElcReceiptNo(lastID);
  const ElecDonation = await DonationCollection.addElecDonation(req,receiptNo)
  return ElecDonation;
}

const delElecDonation = async (req)=>{
  const ElecDonation = await DonationCollection.delElecDonation(req)
  console.log(ElecDonation)
  return ElecDonation;
}

const getElecDonation = async(req)=>{
  const data = await DonationCollection.getElecDonation(req)
  return data
}

const getElecDonationbyID = async(req)=>{
  const data = await DonationCollection.getElecDonationbyId(req)
  return data
}

const cashDonation = async (req) => {
  const lastID = await DonationCollection.getLastID();
  const receiptNo = generateReceiptNo(lastID);
  const donation = await DonationCollection.adddonation(req,receiptNo);
  return donation;
};

const list = async(req) => {
  const record = await DonationCollection.newDonationRecord(req);
  return record;
}

const getItemList = async()=>{
  const list = await DonationCollection.getItemList();
  return list;
}

const allList = async(req)=>{
  const record = await DonationCollection.allDonationRecord(req);
  return record;
}


const getDonationType = async(req)=>{
  const donationType = await DonationCollection.getDonationType(req);
  return donationType;

}

const addDonationType = async(req)=>{
  const donationType = await DonationCollection.addDonationType(req);
  return donationType;

}

const DelDonationType = async(req)=>{
  const donationType = await DonationCollection.delDonationType(req);
  return donationType;

}
const EditDonationType = async(req)=>{
  const donationType = await DonationCollection.EditDonationType(req);
  return donationType;

}

const isChequeDownload = async(req)=>{    //checking the users assigned vouchers
  const status = await DonationCollection.isChequeDownload(req);
  return status;

}

module.exports = {
  cashDonation,
  list,
  getItemList,
  allList,
  addNewDonation,
  addelecDonation,
  getElecDonation,
  delElecDonation,
  getElecDonationbyID,
  getDonationType,
  addDonationType,
  isChequeDownload,
  DelDonationType,
  EditDonationType
};
