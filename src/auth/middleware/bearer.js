'use strict';

// const jwt = require ('jsonwebtoken');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ').pop();

    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // const userName = decodedToken.username;

    const validUser = await users.authenticateWithToken(token); // use findOne where property with username value

    req.user = validUser;
    req.token = validUser.token;
    
    if(!validUser){
      throw new Error('Invalid Login!');
    }

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};