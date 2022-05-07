'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user_game_history, {
        as: 'user_game_history',
        foreignKey: 'id_user',
      });
    }
  }
  user_game.init(
    {
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'user_game',
    }
  );
  return user_game;
};
