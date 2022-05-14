/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_game, {
        as: 'user_game_history',
        foreignKey: 'id_user',
      });
    }
  }
  user_game_history.init(
    {
      skor: DataTypes.INTEGER,
      waktu_login: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'user_game_history',
    }
  );
  return user_game_history;
};
