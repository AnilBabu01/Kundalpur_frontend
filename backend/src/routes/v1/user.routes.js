const express = require("express");
const {
  userController,
  donationController,
  voucherController,
} = require("../../controllers");
const validate = require("../../middlewares/validate");
const { userValidation } = require("../../validations");
const router = express.Router();
const auth = require("../../middlewares/auth");

router
  .route("/login")
  .post(validate(userValidation.login), userController.login);
router
  .route("/login-with-email")
  .post(validate(userValidation.loginEmail), userController.loginWithEmail);
router
  .route("/login-with-mobile")
  .post(validate(userValidation.loginMobile), userController.loginWithMobile);
router.route("/verify-opt").post(userController.verifyOTP);

router
  .route("/user-forgot-password")
  .post(
    auth(),
    validate(userValidation.forgotPass),
    userController.forgotPassword
  );  /// RESET PASSWORD FOR LOGINNED USERS

  router.route('/forgot-password').post( validate(userValidation.ReqforgotPass),
  userController.forgotPasswordReqOtp) ///req otp

  router.route('/verify-otp-forgot').post( 
  userController.verifyForgotOtp) ///req otp
  
  router.route('/changepass-forgot').post( 
    userController.changePassForgot) ///changePassword




router.route("/create-account").post(userController.createAccount);

router.route("/profile-list").get(auth(), userController.profileList);
router.route("/update-profile").post(auth(), userController.updateProfile);

router.route("/item-list").get(auth(), donationController.itemList);
router
  .route("/add-cash-donation")
  .post(auth(), donationController.addCashDonation);
router.route("/add-donation").post(auth(), donationController.addNewDonation);
router.route("/donation-list").get(auth(), donationController.donationList);
router
  .route("/add-elecDonation")
  .post(auth(), donationController.addelecDonation);
router
  .route("/add-elecDonation")
  .get(auth(), donationController.getElecDonation);
  router
  .route("/add-elecDonation")
  .put(auth(), donationController.editElecDonation);
router
  .route("/add-elecDonation")
  .delete(auth(), donationController.deleteElecDonation);
router
  .route("/get-elecDonation")
  .get(auth(), donationController.getElecDonationbyID);

router
  .route("/add-voucher-user")
  .post(auth(), voucherController.GenerateVoucher);
  router
  .route("/add-voucher-user")
  .get(auth(), voucherController.getVoucher);

router.route("/check-voucher").post(auth(), voucherController.checkVoucher);
router.route('/req-voucher').get(auth(),voucherController.requestVoucher)
router.route('/get-req-voucher').get(auth(),voucherController.getrequestVoucher)

module.exports = router;
