'use strict';

// const jwt = require ('jsonwebtoken');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token); // use findOne where property with username value

    req.user = validUser;
    req.token = validUser.token;
    next(); // added this due to hanging in thunderclient
    if(!validUser){
      throw new Error('Invalid Login!');
    }

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};