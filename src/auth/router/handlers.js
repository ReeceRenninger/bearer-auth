'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  
  try {
    let userRecord = await users.create(req.body);

    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output); // updated res.status to 201 to match expected for test
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username); // change to userRecords not users model
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
};