const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { userModel,usersRolesModel,roleModel } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
 try {
    const user = await userModel.findOne({
      where:{id:payload.sub},
      attributes:['id','username','mobileNo','email'],
      include:[
        {
          model:usersRolesModel,
          as:'roleDetails',
          attributes:['user_id','role_id'],
        }
      ],
    });

    if (!user) {
      return done(null, false);
    }
    // eslint-disable-next-line prefer-destructuring
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
