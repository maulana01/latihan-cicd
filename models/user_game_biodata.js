'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserGame, {
        as: 'user_game_biodata',
        foreignKey: 'id_user',
      });
    }
  }
  user_game_biodata.init(
    {
      nama: DataTypes.TEXT,
      alamat: DataTypes.TEXT,
      email: DataTypes.TEXT,
      ttl: DataTypes.DATE,
      jenis_kelamin: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'user_game_biodata',
    }
  );
  return user_game_biodata;
};
