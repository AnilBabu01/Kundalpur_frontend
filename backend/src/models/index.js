const sequelize = require('../db/db-connection');
module.exports.userModel = require('./user.model');
module.exports.otpModel = require('./otp.model');
module.exports.roleModel = require('./role.model');
module.exports.usersRolesModel = require('./users_roles.model');
module.exports.passwordReset = require('./password_reset.model');
module.exports.donationModel = require('./donationDetail.model');
module.exports.newDonationModel = require('./donation.model');
module.exports.donationItem = require('./donationItem.model');
module.exports.ElecDonationModel = require('./electricDonation.model');
module.exports.itemList = require('./item.model');
module.exports.ElecDonationItem = require('./electricDonationItem.model');
module.exports.Vouchers = require('./voucher.model')
module.exports.donationTypes = require('./donationTypes.model')

sequelize.sync().then((result) => {
    console.log('data synced')
}).catch((e) => {
    console.log('error in sync', e)
});




