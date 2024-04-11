'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, { foreignKey: 'productId' });
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.Brand, { foreignKey: 'brandId' });

      Product.belongsToMany(models.Tag, { through: 'ProductTag', foreignKey: 'productId', otherKey: 'tagId' });

      Product.belongsToMany(models.Order, { through: 'OrderDetail', foreignKey: 'productId', otherKey: 'orderId' });

      Product.belongsToMany(models.User, { through: 'Wishlist', foreignKey: 'productId', otherKey: 'userId' });

      Product.hasMany(models.Review, { foreignKey: 'productId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    oldPrice: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specification: DataTypes.TEXT,
    stars: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};