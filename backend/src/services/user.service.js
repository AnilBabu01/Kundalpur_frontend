const httpStatus = require("http-status");
const { UserCollection } = require("../collections");
const AuthCollaction = require("../collections/Auth.Collaction");
const crypto = require('crypto');
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createuser = async (userBody, file) => {
  const user = await AuthCollaction.getUserName(userBody.username);
  if (user) {
    return null;
  }
  console.log(user)
  const result = await UserCollection.createuser(userBody, file,);
  return result;
};

const mobileLogin = async (body) => {
  const checkUser = await AuthCollaction.getUserName(body.mobile_no);
  if(checkUser){
    // ---------check OTP TIME--------
    const checkOtpLastSend = await AuthCollaction.checkOtpLastSend(checkUser.id);
    if(!checkOtpLastSend){
      let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
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

const forgotPass = async (body) => {
  const user = await AuthCollaction.getUserName(body.identity);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username");
  }
  let otp = Math.floor(100000 + Math.random() * 900000); //-----6 digit random number--------
  let resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  const updateForgotPassToken = await AuthCollaction.updateForgotPassToken(user.id,otp,resetPasswordExpires);
  if(body.reset_mode == 'mobile'){
    //--------send OTP---------

  }else if(body.reset_mode == 'email'){
    //-----send mail----------
  }
  return updateForgotPassToken;
};

const forgotPassSecond = async(body) => {
  const data = await AuthCollaction.forgotOTPMatch(body);
  if(!data){
    return null;
  }
  let currentDate = Date.now();
  if(data.resetPasswordExpires < currentDate){
    throw new ApiError(httpStatus.UNAUTHORIZED, "OTP time expire.");
  }
  let resetPasswordToken = crypto.randomBytes(20).toString('hex');
  const update = await UserCollection.generateResetToken(resetPasswordToken,data.user_id);
  return update;
}

const forgotPasswordThird = async(body)=>{
  const data = await AuthCollaction.forgotTokenMatch(body);
  if(!data){
    return null;
  }
  let currentDate = Date.now();
  if(data.resetPasswordExpires < currentDate){
    throw new ApiError(httpStatus.UNAUTHORIZED, "Token time expire.");
  }
  const resetPass = await UserCollection.resetPassword(body,data.user_id);
  return resetPass;

}

const profileUpdate = async(req)=>{
  const update = await UserCollection.updateProfile(req);
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
module.exports = {
  createuser,
  loginuser,
  verifyOTP,
  loginAdmin,
  forgotPass,
  mobileLogin,
  forgotPassSecond,
  forgotPasswordThird,
  profileUpdate,
  profileList,
  createAccount,
  getUsers
};
