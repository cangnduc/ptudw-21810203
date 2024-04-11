'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      { name: 'Vivamus' },
      { name: 'Phasellus' },
      { name: 'pulvinar' },
      { name: 'Curabitur' },
      { name: 'Fusce' },
      { name: 'Sem quis' },
      { name: 'Mollis metus' },
      { name: 'Sit amet' },
      { name: 'Vel posuere' },
      { name: 'orci luctus' }
    ];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Tags', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
