'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = [{
      "productId": 15,
      "tagId": 3
    }, {
      "productId": 5,
      "tagId": 10
    }, {
      "productId": 4,
      "tagId": 5
    }, {
      "productId": 21,
      "tagId": 6
    }, {
      "productId": 26,
      "tagId": 8
    }, {
      "productId": 16,
      "tagId": 9
    }, {
      "productId": 19,
      "tagId": 7
    }, {
      "productId": 27,
      "tagId": 2
    }, {
      "productId": 18,
      "tagId": 7
    }, {
      "productId": 18,
      "tagId": 5
    }, {
      "productId": 7,
      "tagId": 1
    }, {
      "productId": 5,
      "tagId": 4
    }, {
      "productId": 12,
      "tagId": 6
    }, {
      "productId": 27,
      "tagId": 8
    }, {
      "productId": 19,
      "tagId": 1
    }, {
      "productId": 29,
      "tagId": 5
    }, {
      "productId": 16,
      "tagId": 9
    }, {
      "productId": 18,
      "tagId": 10
    }, {
      "productId": 29,
      "tagId": 3
    }, {
      "productId": 9,
      "tagId": 4
    }, {
      "productId": 20,
      "tagId": 3
    }, {
      "productId": 20,
      "tagId": 2
    }, {
      "productId": 14,
      "tagId": 2
    }, {
      "productId": 25,
      "tagId": 8
    }, {
      "productId": 25,
      "tagId": 5
    }, {
      "productId": 14,
      "tagId": 5
    }, {
      "productId": 10,
      "tagId": 4
    }, {
      "productId": 9,
      "tagId": 9
    }, {
      "productId": 1,
      "tagId": 6
    }, {
      "productId": 21,
      "tagId": 4
    }, {
      "productId": 25,
      "tagId": 6
    }, {
      "productId": 24,
      "tagId": 10
    }, {
      "productId": 27,
      "tagId": 4
    }, {
      "productId": 13,
      "tagId": 8
    }, {
      "productId": 28,
      "tagId": 3
    }, {
      "productId": 27,
      "tagId": 10
    }, {
      "productId": 22,
      "tagId": 5
    }, {
      "productId": 20,
      "tagId": 5
    }, {
      "productId": 12,
      "tagId": 2
    }, {
      "productId": 18,
      "tagId": 3
    }, {
      "productId": 25,
      "tagId": 3
    }, {
      "productId": 11,
      "tagId": 4
    }, {
      "productId": 17,
      "tagId": 1
    }, {
      "productId": 25,
      "tagId": 9
    }, {
      "productId": 24,
      "tagId": 3
    }, {
      "productId": 22,
      "tagId": 10
    }, {
      "productId": 20,
      "tagId": 7
    }, {
      "productId": 18,
      "tagId": 5
    }, {
      "productId": 27,
      "tagId": 7
    }, {
      "productId": 26,
      "tagId": 10
    }];
    items = items.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.productId === value.productId && t.tagId === value.tagId
      ))
    );
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('ProductTags', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductTags', null, {});
  }
};
