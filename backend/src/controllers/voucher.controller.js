const httpStatus = require("http-status");
const { VoucherCollection } = require("../collections");
const ApiError = require("../utils/ApiError");

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
    console.log(data)
    if (!data) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
    }
    res.status(200).send({
      status: data.status,
      message : data.message,
    })
})

const getVoucher = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.getVoucher(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  data : data
})
})

const requestVoucher = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.requestVoucher(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  data : "Successfully requested Wait for the Admin Approval !"
})
})



const getrequestVoucher = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.getrequestVoucher(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  data : data
})
})


const EmployeeRole = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.EmployeeRole(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  message : "Successfully created a new role"
})
})


const getEmployeeRole = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.getEmployeeRole(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  data : data
})
})


const EditEmployeeRole = catchAsync(async(req,res)=>{

  const data = await VoucherCollection.EditEmployeeRole(req)

  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "!somthing Went Wrong")
}

res.status(200).send({
  status: true,
  message : "Successfully updated Role"
})
})




module.exports = {
    GenerateVoucher,
    checkVoucher,
    getVoucher,
    requestVoucher,
    getrequestVoucher,
    EmployeeRole,
    getEmployeeRole,
    EditEmployeeRole

}