"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.Chats, {
        foreignKey: "chat_id",
      });
    }
  }
  Messages.init(
    {
      chat_id: DataTypes.UUID,
      sender_id: DataTypes.UUID,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  Messages.beforeCreate((message) => (message.id = uuidv4()));
  return Messages;
};
