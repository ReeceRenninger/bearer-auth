'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    // the big diff:  notice there is no return
    // use SAME property names always
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // hey, this middleware exists!   I can interact with the user before creating the record in our DB
  // user.beforeCreate((user) => {
  //   console.log('our user before being added to DB', user);
  // });
  return user;
};