'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_biodata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.TEXT,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      ttl: {
        type: Sequelize.DATE,
      },
      jenis_kelamin: {
        type: Sequelize.TEXT,
      },
      id_user: {
        type: Sequelize.BIGINT,
        references: {
          model: 'user_games',
          key: 'id',
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_biodata');
  },
};
