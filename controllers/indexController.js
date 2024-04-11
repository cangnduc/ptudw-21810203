const controller = {};
const { json } = require("sequelize");
let models = require("../models");

controller.showIndex = async (req, res) => {
  try {
    // get the first 10 products ordered by the created date
    let recentProducts = await models.Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
      attributes: ["name", "price", "oldPrice","imagePath", "id", "stars","id","createdAt"],
    });
    // get the first 10 products ordered by the stars
    let ratedProducts = await models.Product.findAll({
      order: [["stars", "DESC"]],
      limit: 10,
      attributes: ["name", "price","oldPrice", "imagePath", "id", "stars","id"],
    });

    // get the categories and brands
    let categories = await models.Category.findAll({
      attributes: ["name", "id", "imagePath"],
    });
    res.locals.categoryArray = [
      [categories[0]],
      categories.slice(2, 4),
      categories.slice(1, 2),
    ];
    let brands = await models.Brand.findAll({
      attributes: ["name", "imagePath", "id"],
    });
    res.status(200).render("index", { brands, ratedProducts, recentProducts});
  } catch (err) {
    res.status(500).render("error", { message: "Internal server error" });
  }
};
controller.showPage = (req, res, next) => {
  let page = req.params.page;
  let pages = [
    "about",
    "contact",
    "product-list",
    "product-detail",
    "cart",
    "checkout",
    "login",
    "register",
    "forgot-password",
    "my-account",
  ];
  if (pages.includes(page)) {
    res.render(page);
  } else {
    next();
  }
};

controller.getProducts = async (req, res) => {
  try {
    let products = await models.Product.findAll();
    //products = products.map((product) => product.get({ plain: true }));
    res.json(products).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};
module.exports = controller;
