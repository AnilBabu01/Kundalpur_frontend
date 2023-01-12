const express = require('express');
const { adminController, userController, donationController, voucherController } = require('../../controllers');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { userValidation, authValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

router.route('/cheque-status').post(auth(),donationController.ChangeChequeStatus)
router.route('/login').post(validate(authValidation.adminLogin), adminController.adminLogin);
router.route('/login-employee').post(validate(authValidation.employeeLogin), adminController.EmployeeLogin);
router.route('/user-register').post(validate(userValidation.register), adminController.userRegister);
router.route('/donation-list').get(adminController.allList);
router.route('/donation-list').delete(donationController.delDonation);
router.route('/donation-list').put(donationController.editDonation);
router.route('/donation-list/:id').get(adminController.allList);
router.route('/get-users').get(auth(),userController.getUsers)
router.route('/get-users').put(auth(),adminController.editUser)
router.route('/del-users').delete(auth(),adminController.delUser)
router.route('/donation-type').post(auth(),adminController.addDonationType)
router.route('/donation-type').get(auth(),adminController.getDonationType)
router.route('/donation-type').delete(auth(),adminController.DelDonationType)
router.route('/donation-type').put(auth(),adminController.EditDonationType)
router.route('/add-employee').post(auth(),adminController.addEmployees)
router.route('/add-employee').get(auth(),userController.getEmployees)
router.route('/add-employee').delete(auth(),userController.delEmployees)
router.route('/add-employee').put(auth(),userController.editEmployee)

module.exports = router;