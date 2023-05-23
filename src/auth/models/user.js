'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    // the big diff:  notice there is no return
    // use SAME property names always
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
  return user;
};