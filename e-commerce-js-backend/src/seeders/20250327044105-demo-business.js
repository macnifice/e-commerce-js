'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Businesses', [
      {
        name: 'Tienda Central',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MiniMarket del Norte',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Super Ahorro Express',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Businesses', null, {});
  }
};
