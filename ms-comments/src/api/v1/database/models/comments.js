"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Services, {
        foreignKey: "service_id",
      });
      Comments.belongsTo(models.Users, {
        foreignKey: "sender_id",
      });
    }
  }
  Comments.init(
    {
      service_id: DataTypes.UUID,
      sender_id: DataTypes.UUID,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  Comments.beforeCreate((comment) => (comment.id = uuidv4()));
  return Comments;
};
