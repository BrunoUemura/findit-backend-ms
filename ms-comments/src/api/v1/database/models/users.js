"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          validatorFunction: function (data) {
            if (data.length < 3)
              throw new Error("Name must be at least 3 characteres");
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      user_photo: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      phone: DataTypes.STRING,
      occupation: DataTypes.STRING,
      about_me: DataTypes.STRING,
      email_verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
    }
  );
  Users.beforeCreate((user) => (user.id = uuidv4()));
  return Users;
};
