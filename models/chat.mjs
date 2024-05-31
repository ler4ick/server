'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, { foreignKey: 'id_person_1', as: 'person1' });
      Chat.belongsTo(models.User, { foreignKey: 'id_person_2', as: 'person2' });
    }
  }
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    id_person_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_person_2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    messages: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats'
  });
  return Chat;
};