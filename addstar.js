let models = require("./models");

(async function addstar() {
  try {
    let products = await models.Product.findAll({
      include: [
        {
          model: models.Review,
        },
      ],
    });
    let updatedProducts = [];
    products.forEach((item) => {
      let stars = 0;
      if (item.Reviews.length > 0) {
        stars =
          item.Reviews.reduce((total, item) => {
            return total + item.stars;
          }, 0) / item.Reviews.length;
      }
      item.stars = stars.toFixed(1);
      updatedProducts.push({
        id: item.id,
        stars: item.stars,
      });
    });
    console.log(updatedProducts);
    updatedProducts.forEach(async (item) => {
      let product = await models.Product.findByPk(item.id);
      product.stars = item.stars;
      await product.save();
      console.log("Stars added successfully");
    });
  } catch (err) {
    console.log(err);
  }
})();
