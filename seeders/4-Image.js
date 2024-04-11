'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [{
      "name": "diam nam",
      "imagePath": "/img/product-9.png",
      "productId": 18
    }, {
      "name": "id ornare",
      "imagePath": "/img/product-4.png",
      "productId": 30
    }, {
      "name": "luctus et",
      "imagePath": "/img/product-6.png",
      "productId": 13
    }, {
      "name": "ac leo",
      "imagePath": "/img/product-4.png",
      "productId": 3
    }, {
      "name": "nulla eget",
      "imagePath": "/img/product-4.png",
      "productId": 23
    }, {
      "name": "porta volutpat",
      "imagePath": "/img/product-4.png",
      "productId": 12
    }, {
      "name": "amet lobortis",
      "imagePath": "/img/product-3.png",
      "productId": 15
    }, {
      "name": "fusce posuere",
      "imagePath": "/img/product-6.png",
      "productId": 19
    }, {
      "name": "donec semper",
      "imagePath": "/img/product-9.png",
      "productId": 16
    }, {
      "name": "tortor risus",
      "imagePath": "/img/product-3.png",
      "productId": 29
    }, {
      "name": "pede libero",
      "imagePath": "/img/product-5.png",
      "productId": 27
    }, {
      "name": "suspendisse potenti",
      "imagePath": "/img/product-9.png",
      "productId": 10
    }, {
      "name": "vehicula condimentum",
      "imagePath": "/img/product-7.png",
      "productId": 12
    }, {
      "name": "ipsum ac",
      "imagePath": "/img/product-9.png",
      "productId": 28
    }, {
      "name": "non mi",
      "imagePath": "/img/product-2.png",
      "productId": 21
    }, {
      "name": "mauris enim",
      "imagePath": "/img/product-3.png",
      "productId": 19
    }, {
      "name": "ultrices posuere",
      "imagePath": "/img/product-6.png",
      "productId": 5
    }, {
      "name": "congue risus",
      "imagePath": "/img/product-3.png",
      "productId": 3
    }, {
      "name": "ante vel",
      "imagePath": "/img/product-4.png",
      "productId": 1
    }, {
      "name": "hac habitasse",
      "imagePath": "/img/product-6.png",
      "productId": 18
    }, {
      "name": "elit sodales",
      "imagePath": "/img/product-6.png",
      "productId": 13
    }, {
      "name": "in quis",
      "imagePath": "/img/product-1.png",
      "productId": 28
    }, {
      "name": "ut blandit",
      "imagePath": "/img/product-8.png",
      "productId": 20
    }, {
      "name": "luctus et",
      "imagePath": "/img/product-5.png",
      "productId": 10
    }, {
      "name": "porttitor lacus",
      "imagePath": "/img/product-4.png",
      "productId": 5
    }, {
      "name": "mi pede",
      "imagePath": "/img/product-8.png",
      "productId": 11
    }, {
      "name": "viverra pede",
      "imagePath": "/img/product-6.png",
      "productId": 29
    }, {
      "name": "vel nulla",
      "imagePath": "/img/product-5.png",
      "productId": 9
    }, {
      "name": "ut nulla",
      "imagePath": "/img/product-6.png",
      "productId": 24
    }, {
      "name": "lorem integer",
      "imagePath": "/img/product-9.png",
      "productId": 9
    }, {
      "name": "at nulla",
      "imagePath": "/img/product-8.png",
      "productId": 30
    }, {
      "name": "elementum ligula",
      "imagePath": "/img/product-8.png",
      "productId": 12
    }, {
      "name": "sed nisl",
      "imagePath": "/img/product-6.png",
      "productId": 11
    }, {
      "name": "morbi porttitor",
      "imagePath": "/img/product-6.png",
      "productId": 15
    }, {
      "name": "tortor sollicitudin",
      "imagePath": "/img/product-8.png",
      "productId": 14
    }, {
      "name": "lacinia erat",
      "imagePath": "/img/product-5.png",
      "productId": 17
    }, {
      "name": "erat tortor",
      "imagePath": "/img/product-6.png",
      "productId": 16
    }, {
      "name": "nisi volutpat",
      "imagePath": "/img/product-1.png",
      "productId": 20
    }, {
      "name": "eget vulputate",
      "imagePath": "/img/product-1.png",
      "productId": 28
    }, {
      "name": "enim leo",
      "imagePath": "/img/product-5.png",
      "productId": 17
    }, {
      "name": "erat quisque",
      "imagePath": "/img/product-2.png",
      "productId": 14
    }, {
      "name": "venenatis non",
      "imagePath": "/img/product-1.png",
      "productId": 26
    }, {
      "name": "integer aliquet",
      "imagePath": "/img/product-3.png",
      "productId": 29
    }, {
      "name": "velit nec",
      "imagePath": "/img/product-4.png",
      "productId": 1
    }, {
      "name": "sapien dignissim",
      "imagePath": "/img/product-1.png",
      "productId": 18
    }, {
      "name": "in faucibus",
      "imagePath": "/img/product-8.png",
      "productId": 11
    }, {
      "name": "eget elit",
      "imagePath": "/img/product-8.png",
      "productId": 21
    }, {
      "name": "sit amet",
      "imagePath": "/img/product-7.png",
      "productId": 19
    }, {
      "name": "lobortis sapien",
      "imagePath": "/img/product-5.png",
      "productId": 18
    }, {
      "name": "a odio",
      "imagePath": "/img/product-4.png",
      "productId": 26
    }, {
      "name": "aenean lectus",
      "imagePath": "/img/product-4.png",
      "productId": 26
    }, {
      "name": "auctor gravida",
      "imagePath": "/img/product-6.png",
      "productId": 28
    }, {
      "name": "interdum mauris",
      "imagePath": "/img/product-6.png",
      "productId": 5
    }, {
      "name": "vel pede",
      "imagePath": "/img/product-1.png",
      "productId": 30
    }, {
      "name": "consequat ut",
      "imagePath": "/img/product-7.png",
      "productId": 11
    }, {
      "name": "leo rhoncus",
      "imagePath": "/img/product-2.png",
      "productId": 9
    }, {
      "name": "elit sodales",
      "imagePath": "/img/product-7.png",
      "productId": 25
    }, {
      "name": "in faucibus",
      "imagePath": "/img/product-2.png",
      "productId": 13
    }, {
      "name": "nunc rhoncus",
      "imagePath": "/img/product-2.png",
      "productId": 1
    }, {
      "name": "lobortis vel",
      "imagePath": "/img/product-9.png",
      "productId": 19
    }, {
      "name": "nibh in",
      "imagePath": "/img/product-3.png",
      "productId": 29
    }, {
      "name": "lorem id",
      "imagePath": "/img/product-8.png",
      "productId": 15
    }, {
      "name": "magna bibendum",
      "imagePath": "/img/product-8.png",
      "productId": 9
    }, {
      "name": "magna at",
      "imagePath": "/img/product-9.png",
      "productId": 25
    }, {
      "name": "porttitor lacus",
      "imagePath": "/img/product-2.png",
      "productId": 4
    }, {
      "name": "magnis dis",
      "imagePath": "/img/product-8.png",
      "productId": 5
    }, {
      "name": "curae nulla",
      "imagePath": "/img/product-8.png",
      "productId": 14
    }, {
      "name": "pede libero",
      "imagePath": "/img/product-2.png",
      "productId": 1
    }, {
      "name": "primis in",
      "imagePath": "/img/product-5.png",
      "productId": 20
    }, {
      "name": "velit donec",
      "imagePath": "/img/product-8.png",
      "productId": 1
    }, {
      "name": "pretium nisl",
      "imagePath": "/img/product-2.png",
      "productId": 21
    }, {
      "name": "turpis enim",
      "imagePath": "/img/product-4.png",
      "productId": 13
    }, {
      "name": "faucibus orci",
      "imagePath": "/img/product-9.png",
      "productId": 29
    }, {
      "name": "congue risus",
      "imagePath": "/img/product-7.png",
      "productId": 3
    }, {
      "name": "sed justo",
      "imagePath": "/img/product-8.png",
      "productId": 5
    }, {
      "name": "in faucibus",
      "imagePath": "/img/product-6.png",
      "productId": 6
    }, {
      "name": "nulla tempus",
      "imagePath": "/img/product-5.png",
      "productId": 5
    }, {
      "name": "tortor risus",
      "imagePath": "/img/product-5.png",
      "productId": 14
    }, {
      "name": "turpis adipiscing",
      "imagePath": "/img/product-3.png",
      "productId": 15
    }, {
      "name": "donec posuere",
      "imagePath": "/img/product-9.png",
      "productId": 4
    }, {
      "name": "dui vel",
      "imagePath": "/img/product-4.png",
      "productId": 18
    }, {
      "name": "consectetuer eget",
      "imagePath": "/img/product-9.png",
      "productId": 5
    }, {
      "name": "bibendum morbi",
      "imagePath": "/img/product-6.png",
      "productId": 15
    }, {
      "name": "ipsum primis",
      "imagePath": "/img/product-4.png",
      "productId": 4
    }, {
      "name": "nunc purus",
      "imagePath": "/img/product-1.png",
      "productId": 22
    }, {
      "name": "convallis nulla",
      "imagePath": "/img/product-5.png",
      "productId": 19
    }, {
      "name": "ac neque",
      "imagePath": "/img/product-2.png",
      "productId": 10
    }, {
      "name": "dapibus duis",
      "imagePath": "/img/product-1.png",
      "productId": 5
    }, {
      "name": "in leo",
      "imagePath": "/img/product-2.png",
      "productId": 25
    }, {
      "name": "congue elementum",
      "imagePath": "/img/product-5.png",
      "productId": 7
    }, {
      "name": "lectus in",
      "imagePath": "/img/product-3.png",
      "productId": 6
    }, {
      "name": "vulputate ut",
      "imagePath": "/img/product-9.png",
      "productId": 12
    }, {
      "name": "rhoncus mauris",
      "imagePath": "/img/product-3.png",
      "productId": 21
    }, {
      "name": "primis in",
      "imagePath": "/img/product-7.png",
      "productId": 8
    }, {
      "name": "sapien a",
      "imagePath": "/img/product-1.png",
      "productId": 27
    }, {
      "name": "integer non",
      "imagePath": "/img/product-1.png",
      "productId": 29
    }, {
      "name": "scelerisque quam",
      "imagePath": "/img/product-1.png",
      "productId": 27
    }, {
      "name": "augue a",
      "imagePath": "/img/product-2.png",
      "productId": 16
    }, {
      "name": "nec dui",
      "imagePath": "/img/product-9.png",
      "productId": 22
    }, {
      "name": "morbi vestibulum",
      "imagePath": "/img/product-3.png",
      "productId": 9
    }];

    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Images', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
