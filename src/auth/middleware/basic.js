'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {
  //autherror was here, changed to next with error message 
  try {
    if (!req.headers.authorization) {
      { res.status(403).send('NOT AUTHORIZED'); }
    }

    let basic = req.headers.authorization;
    let basicString = basic.split(' ').pop();
    let [username, pass] = base64.decode(basicString).split(':');
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};