'use strict';

const { userModel } = require('../../models/index');

module.exports = async (req, res, next) => {
  //if no token exists
  if(!req.header.authorization){
    next('Not authorized, no token found!');
  } else {
    try {
      // our auth string should be: Bearer <LONG TOKEN>
      // chceking if header has "Bearer" in first position
      let authType = req.headers.authorization.split(' ')[0];
      if(authType === 'Bearer'){
        let token = req.headers.authorization.split(' ')[1];
        //!! DO NOT LEAVE ANY CONSOLES IN HERE 
        let validUser = await userModel.authenticateBearer(token);
        if(validUser){
          req.user = validUser;
          next();
        }
      } else {
        next('Send a token in bearer auth string please!');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};