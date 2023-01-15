const httpStatus = require("http-status");
const { UserCollection } = require("../collections");
const AuthCollaction = require("../collections/Auth.Collaction");
const crypto = require('crypto');
const ApiError = require("../utils/ApiError");
const { checkMobile, checkEmail, checkEmployeeMobile, checkEmployeeEmail } = require("../collections/User.Collaction");


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createuser = async (userBody, file) => {
  const user = await AuthCollaction.getAdminName(userBody.username);
  if (user) {
    return {
      status:false,
      message:"User already exists"
    }
  }
  console.log(user)
  const result = await UserCollection.createuser(userBody, file);
  
  return result;
};

const mobileLogin = async (body) => {
  const checkUser = await AuthCollaction.getUserName(body.mobile_no);

  if(checkUser){
    // ---------check OTP TIME--------
    const checkOtpLastSend = await AuthCollaction.checkOtpLastSend(checkUser.id);
    if(!checkOtpLastSend){
      let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
      // sendSms(otp,body.mobile_no)
      const update_otp = await UserCollection.updateOTP(checkUser.id, otp);
      return update_otp;
    }else{
      let date_ob = new Date();
      var seconds = 60;
      var parsedDate = new Date(Date.parse(checkOtpLastSend.updatedAt));
      var newDate = new Date(parsedDate.getTime() + (1000 * seconds));
      const remaining = date_ob - newDate;
      const checkRemaining  = Math.floor( (remaining/1000) % 60 );
      if(checkRemaining > 0){ //----check remaining time-----
        let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
        const update_otp = await UserCollection.updateOTP(checkUser.id, otp);
        // sendSms(otp,body.mobile_no)
        return update_otp; 
      }else{
        throw new ApiError(httpStatus.NOT_FOUND, `Please wait ${Math.abs(checkRemaining)} seconds.`); 
      }
    }
  }else{

    const result = await UserCollection.selfRegister(body);
    
    if(!result){
      throw new ApiError(httpStatus.NOT_FOUND, "Something went wrong. Please try again."); 
    }
    let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
    const update_otp = await UserCollection.updateOTP(result, otp);
    return update_otp;
  }
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginuser = async (identity, password) => {
  const user = await AuthCollaction.getUserDetails(identity);
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username or password");
  }
  return user;
};

const loginAdmin = async (username, password) => {
  const user = await AuthCollaction.getAdminName(username);
  console.log(user)
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect username or password");
  }
  return user;
};

const verifyOTP = async (username, otp) => {
  console.log(username,otp,"userdata")
  const isOTPMatch = await AuthCollaction.isOTPMatch(username, otp);

  console.log(isOTPMatch,"otpmatch")
  if (!isOTPMatch) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "OTP mismatch.");
  }
  const user = await AuthCollaction.getUserDetails(username);
  console.log(user,"iser")
  return user;
};


const forgotPass = async(req)=>{
  const data = await AuthCollaction.forgotPass(req);
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED,"Failed to Forgot Password")
  }
 
  return data
}

const profileUpdate = async(req)=>{
  const update = await UserCollection.updateProfile(req);
  return update;
}

const changePassForgot = async (req)=>{
  const update = await AuthCollaction.changePassForgot(req);
  return update;
}
const profileList = async(req)=>{
  const list = await UserCollection.profileList(req);
  if(!list){
    throw new ApiError(httpStatus.UNAUTHORIZED, "Record not found.");
  }
  return list;
}

const createAccount = async(req)=>{
  //-----check mobile exist or not ------
  const mobile = await UserCollection.checkMobile(req.body.mobileno);

  if(mobile.length > 0){
  
    return{
      status:0,
      error : "Mobile number already exist."
    }

  }
  const email = await UserCollection.checkEmail(req.body.email);
  if(email.length > 0){
    return{
      status:0,
      error : "Email already exist"
    }
  }
  //-----check email exist or not ------
  const create = await  UserCollection.createAccount(req);
  console.log(create)
  return create;
}

const getUsers = async (req)=>{
  
  const users = await UserCollection.getUsers(req);
  return users;
}

const delUser = async (req)=>{
  const users = await UserCollection.delUser(req);
  return users;
}


const editUser = async (req)=>{
  const users = await UserCollection.editUser(req);
  return users;
}

const addEmployees = async (req)=>{

  const mobile = await checkEmployeeMobile(req.body.Mobile)
  const email = await checkEmployeeEmail(req.body.Email)
  if(mobile.length > 0){
    return {
      status:false,
      message : "Mobile number already exist."
    }
  }

  if(email.length > 0){
    return {
      status:false,
      message : "Email already exist."
    }
  }

  const employees = await UserCollection.addEmployees(req);
if(employees){
  return {
    status : true,
    message: "User Added Successfully"
  };
}
}


const getEmployees = async (req)=>{
  const employees = await UserCollection.getEmployees(req);
  return employees;
}

const delEmployees = async (req)=>{
  const employees = await UserCollection.delEmployees(req);
  return employees;
}

const editEmployee = async (req)=>{
  const employees = await UserCollection.editEmployee(req);
  return employees;
}

const forgotPasswordReqOtp = async (req)=>{
  const data = await AuthCollaction.forgotPasswordReqOtp(req)
  return data 

}

const loginEmployee = async (email, password)=>{
  const user = await AuthCollaction.getEmployee(email);
  console.log(user)
  if (!user || !(await AuthCollaction.isPasswordMatch(password, user.Password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect username or password");
  }
  return user;

}



module.exports = {
  createuser,
  loginuser,
  verifyOTP,
  loginAdmin,
  forgotPass,
  mobileLogin,
  profileUpdate,
  profileList,
  changePassForgot,
  createAccount,
  getUsers,
  delUser,
  editUser,
  addEmployees,
  getEmployees,
  delEmployees,
  forgotPasswordReqOtp,
  loginEmployee,
  editEmployee
};
