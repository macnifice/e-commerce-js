'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: '$2b$10$RyVaAmEiylASrGRMH3hwu.340r58s87lUK34IO791kFwvysRG.jZ6',
        role: 'admin',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tienda Central',
        email: 'tienda@tienda.com',
        password: '$2b$10$RyVaAmEiylASrGRMH3hwu.340r58s87lUK34IO791kFwvysRG.jZ6',
        role: 'business',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MiniMarket del Norte',
        email: 'mini@mini.com',
        password: '$2b$10$RyVaAmEiylASrGRMH3hwu.340r58s87lUK34IO791kFwvysRG.jZ6',
        role: 'business',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Super Ahorro Express',
        email: 'super@super.com',
        password: '$2b$10$RyVaAmEiylASrGRMH3hwu.340r58s87lUK34IO791kFwvysRG.jZ6',
        role: 'business',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
