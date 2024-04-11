const controllers = {};
let models = require("../models");
controllers.getData = async (req, res, next) => {
  try {
    let tags = await models.Tag.findAll();
    let brands = await models.Brand.findAll({
      attributes: ["name", "id"],
      include: [
        {
          model: models.Product,
          attributes: ["id", "name"],
        },
      ],
    });
    let categories = await models.Category.findAll({
      include: [
        {
          model: models.Product,
          attributes: ["name", "id"],
        },
      ],
    });
    //send the data to the next middleware
    res.locals.tags = tags;
    res.locals.brands = brands;
    res.locals.categories = categories;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
controllers.showProducts = async (req, res) => {
  try {
    let keyword = req.query.keyword ? req.query.keyword : "";
    let tagID = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
    let categoryID = isNaN(req.query.category)
      ? 0
      : parseInt(req.query.category);
    let page = isNaN(req.query.page)
      ? 1
      : Math.max(1, parseInt(req.query.page));
    const sortList = ["popular", "newest", "price"];
    let sortName = sortList.includes(req.query.sort) ? req.query.sort : "price";
    let brandID = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
    //res.locals.categories = categories;
    let options = {
      attributes: [
        "name",
        "price",
        "oldPrice",
        "imagePath",
        "id",
        "stars",
        "createdAt",
      ],

      where: {},
    };
    if (brandID > 0) {
      options.where.brandId = brandID;
    }
    if (categoryID > 0) {
      options.where.categoryId = categoryID;
    }
    if (tagID > 0) {
      options.include = [
        {
          model: models.Tag,
          where: {
            id: tagID,
          },
        },
      ];
    }
    if (keyword.trim() != "") {
      options.where.name = {
        [models.Sequelize.Op.like]: `%${keyword}%`,
      };
    }
    switch (sortName) {
      case "popular":
        options.order = [["stars", "DESC"]];
        break;
      case "newest":
        options.order = [["createdAt", "DESC"]];
        break;
      default:
        options.order = [["price", "ASC"]];
    }

    res.locals.sortName = sortName;

    res.locals.orginalUrl = removeParam("sort", req.originalUrl);
    if (Object.keys(req.query).length == 0) {
      res.locals.orginalUrl = req.originalUrl + "?";
    }

    // handle the pagination
    let limit = 6;
    let offset = (page - 1) * limit;
    options.limit = limit;
    options.offset = offset;
    let { count, rows } = await models.Product.findAndCountAll(options);
    let pagination = {
      page: page,
      limit: limit,
      totalRows: count,
      queryParams: req.query,
    };
    //let products = rows;

    res.status(200).render("product-list", { rows, pagination });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
controllers.showProductDetail = async (req, res) => {
  try {
    // get the id parameter from the request
    let productID = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    if (productID == 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    let product = await models.Product.findOne({
      where: {
        id: productID,
      },
      include: [
        {
          model: models.Image,
        },
        {
          model: models.Review,
          include: {
            model: models.User,
            attributes: ["firstName", "lastName"],
          },
        },
        {
            model: models.Tag,
            attributes: ['id','name']
        }
      ],
    });
    let tagIds = [];
    product.Tags.forEach(tag => {
        tagIds.push(tag.id);
    });
    //console.log(tagIds); // [1,2,3]
    let relatedProducts = await models.Product.findAll({
        attributes: ['name', 'price', 'oldPrice', 'imagePath', 'id', 'stars'],
        include: [
            {
                model: models.Tag,
                where: {
                    id: {
                        [models.Sequelize.Op.in]: tagIds
                    }
                }
            }
        ],
        limit: 6
    });
    //console.log(relatedProducts);
    //console.log(product);
    res.status(200).render("product-detail", { product , relatedProducts});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
    param,
    params_arr = [],
    queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}
module.exports = controllers;
