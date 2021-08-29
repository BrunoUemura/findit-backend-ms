"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chats.belongsTo(models.Users, {
        foreignKey: "sender_id",
      });
      Chats.belongsTo(models.Users, {
        foreignKey: "receiver_id",
      });
      Chats.hasMany(models.Messages, {
        foreignKey: "chat_id",
      });
    }
  }
  Chats.init(
    {
      sender_id: DataTypes.UUID,
      receiver_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Chats",
    }
  );
  Chats.beforeCreate((chat) => (chat.id = uuidv4()));
  return Chats;
};
