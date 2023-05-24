'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js'); //updated to users

module.exports = async (req, res, next) => {
  //autherror was here, changed to next with error message 
  if (!req.headers.authorization) {
    next('No auth headers are present!');
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, password); //updated to users
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};