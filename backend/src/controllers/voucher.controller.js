const httpStatus = require("http-status");
const { VoucherCollection } = require("../collections");

const catchAsync = require("../utils/catchAsync");


const GenerateVoucher = catchAsync(async(req,res)=>{

    const data = await VoucherCollection.generateVoucher(req)
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "!somthing Went Wrong");
      }
console.log(data)
      res.send({
        message:"VOUCHER GENERATED SUCCESSFULLY"
      })

})

const checkVoucher = catchAsync(async(req,res)=>{
    const data = await VoucherCollection.checkVoucher(req)
    if (!data) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")

    }
    res.send({
      status: data.status,
      message : data.message,
    })
})


module.exports = {
    GenerateVoucher,
    checkVoucher
}