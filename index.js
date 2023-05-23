'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const { db } = require('./src/auth/models');
const { start } = require('./src/server');

db.sync()
  .then(() => {
    console.log('Successful DB connection');
    start(PORT);
  })
  .catch((err) => console.error(err));