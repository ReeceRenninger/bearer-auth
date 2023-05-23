'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (sequelize, DataTypes) => {
  //!! this user variable is used below for authentication middleware
  const user = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // DO NOT INCLUDE PASSWORD IN YOUR TOKEN
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      //when I access the user data, this get method will generate the virtual token AT THAT MOMENT
      //!! expiresIn math below holds token for 1 week, 1 second, times 60 to equal a minute, then 60 for an hour, 24 hours a day, 7 days.
      get() {
        return jwt.sign({username: this.username}, SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7});
      },
      set() {
        return jwt.sign({username: this.username}, SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7});
      },
    },
  });
  // hey, this middleware exists!   I can interact with the user before creating the record in our DB
  // user.beforeCreate((user) => {
  //   console.log('our user before being added to DB', user);
  // });

  // authenticateBearer function used in bearer folder index.js
  // utilized the user creation variable above to attach this method to it for authentication
  user.authenticateBearer = async (token) => {
    try {
      // this gives us the object stored in our token. reference the first parameter in jwt.sign above.
      let payload = jwt.verify(token, SECRET);
      console.log('payload: ', payload);
      const selectedUser = await user.findOne({where: {username: payload.username}});
      if(selectedUser){
        return selectedUser;
      }
      
    } catch (error) {
      console.error('error in authenticateBearer method, message: ', error.message);
    }
  };
  return user;
};