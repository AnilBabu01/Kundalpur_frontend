const express = require('express');
const { adminController, userController } = require('../../controllers');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { userValidation, authValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

router.route('/login').post(validate(authValidation.adminLogin), adminController.adminLogin);
router.route('/user-register').post(validate(userValidation.register), adminController.userRegister);
router.route('/donation-list').get(adminController.allList);
router.route('/donation-list/:id').get(adminController.allList);
router.route('/get-users').get(auth(),userController.getUsers)
router.route('/get-users').put(auth(),adminController.editUser)
router.route('/del-users').delete(auth(),adminController.delUser)
router.route('/donation-type').post(auth(),adminController.addDonationType)
router.route('/donation-type').get(auth(),adminController.getDonationType)
router.route('/add-employee').post(auth(),adminController.addEmployees)
router.route('/add-employee').get(auth(),userController.getEmployees)
router.route('/add-employee').delete(auth(),userController.delEmployees)
module.exports = router;