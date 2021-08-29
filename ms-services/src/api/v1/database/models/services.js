"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Services.init(
    {
      user_id: DataTypes.UUID,
      title: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.NUMERIC,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Services",
      paranoid: true,
    }
  );
  Services.beforeCreate((service) => (service.id = uuidv4()));
  return Services;
};
