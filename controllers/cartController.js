"use strict";
let controller = {};
let models = require("../models");
controller.addCart = async (req, res) => {
  let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
  let quantity = isNaN(req.body.quantity) ? 1 : parseInt(req.body.quantity);
  let product = await models.Product.findByPk(id);
  if (product && quantity >= 1) {
    let cart = req.session.cart;
    if (!cart) {
      cart = req.session.cart = new Cart();
    }
    cart.add(product, quantity);

    res.status(200).json({
      message: "Product added to cart",
      quantity: req.session.cart.quantity,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
controller.showCart = (req, res) => {
  res.status(200).render("cart", { cart: req.session.cart.getCart() });
};
controller.updateCart = (req, res) => {
  let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
  let quantity = isNaN(req.body.quantity) ? 1 : parseInt(req.body.quantity);
  let cart = req.session.cart;

  if (cart) {
    let updatedItem = cart.update(id, quantity);
    res.status(200).json({
      message: "Cart updated",
      item: updatedItem,
      quantity: req.session.cart.quantity,
      subtotal: req.session.cart.subtotal,
      total: req.session.cart.total,
    });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};
controller.removeCart = (req, res) => {
  let id = isNaN(req.body.id) ? 0 : parseInt(req.body.id);
  let cart = req.session.cart;

  if (cart) {
    cart.remove(id);
    console.log("card removed");
    res.status(200).json({
      message: "Item removed from cart",
      quantity: req.session.cart.quantity,
      subtotal: req.session.cart.subtotal,
      total: req.session.cart.total,
    });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};
controller.clearCart = (req, res) => {
  let cart = req.session.cart;
  if (cart) {
    cart.clear();
    res.status(200).json({ message: "Cart cleared" });
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};
module.exports = controller;
