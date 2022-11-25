'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team',
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals:{
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals'
      },
      awayTeamGoals:{
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
        defaultValue: 0,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};