const httpStatus = require("http-status");
const { donationService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const addNewDonation = catchAsync(async (req, res) => {
  const data = await donationService.addNewDonation(req);
  console.log(data,'elect')
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Donation addedd successfully.",
  });
});

const addelecDonation = catchAsync(async (req, res) => {
  const data = await donationService.addelecDonation(req);
  console.log(data,'elect')
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Electric Donation added successfully.",
  });
});


const getElecDonation = catchAsync(async(req,res)=>{
  const data = await donationService.getElecDonation(req)

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Succes",
    data:data
  });
})

const getElecDonationbyID = catchAsync(async(req,res)=>{
  const data = await donationService.getElecDonationbyID(req)

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Success",
    data:data
  });
})

const deleteElecDonation = catchAsync(async(req,res)=>{
  const data = await donationService.delElecDonation(req)

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Success",
  });
})


const addCashDonation = catchAsync(async (req, res) => {
  const data = await donationService.cashDonation(req);
  res.status(httpStatus.CREATED).send(data);
});

const donationList = catchAsync(async (req, res) => {
  const data = await donationService.list(req);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  } else {
    res.status(200).send({
      msg: "All record.",
      donation: data,
    });
  }
});

const itemList = catchAsync(async (req, res) => {
  const data = await donationService.getItemList();
  res.status(200).send(data);
});

const addDonationType = catchAsync(async (req, res) => {
  const data = await donationService.addDonationType(req);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong")
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    msg: "Success",
  });
});

const getDonationType = catchAsync(async (req, res) => {
  const data = await donationService.getDonationType(req);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong")
  }
  res.status(httpStatus.CREATED).send({
    status: true,
    data: data
  });
});

const ChangeChequeStatus = catchAsync(async (req,res)=>{
  const data = await donationService.changeChequeStatus(req);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong")
  }

  res.status(200).send({
    status: true,
    msg: "cheque Status Updated successfully",
  });

})


module.exports = {
  addCashDonation,
  donationList,
  itemList,
  addNewDonation,
  addelecDonation,
  getElecDonation,
  deleteElecDonation,
  getElecDonationbyID,
  addDonationType,
  getDonationType,
  ChangeChequeStatus
};
