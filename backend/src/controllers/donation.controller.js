const httpStatus = require('http-status');
const { donationService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');


const addNewDonation = catchAsync(async(req,res)=>{
  const data = await donationService.addNewDonation(req);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }
  res.status(httpStatus.CREATED).send({
    status:true,
    msg:'Donation addedd successfully.'
  });
})

const addCashDonation = catchAsync(async(req,res)=>{
  const data = await donationService.cashDonation(req);
  res.status(httpStatus.CREATED).send(data);
})

const donationList = catchAsync( async(req,res)=>{
  const data = await donationService.list(req);
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
  }else{
    res.status(200).send({
      msg:'All record.',
      donation:data
    })
  }
})

const itemList = catchAsync(async(req,res)=>{
  const data = await donationService.getItemList();
  res.status(200).send(data);
})

module.exports = {
  addCashDonation,
  donationList,
  itemList,
  addNewDonation
};