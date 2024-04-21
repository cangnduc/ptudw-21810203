"use strict";
let models = require("../models");
let controller = {};

controller.checkOut = async (req, res) => {
  if (req.session.cart.quantity > 0) {
    let userId = req.user.id;
    let addresses = await models.Address.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).render("checkout", {
      cart: req.session.cart.getCart(),
      addresses: addresses,
    });
  } else {
    console.log("cart is empty");
    res.redirect("/products");
  }
};
controller.placeOrders = async (req, res) => {
  let addressId = isNaN(req.body.addressId) ? 0 : parseInt(req.body.addressId);
  let userId = req.user.id;
  let oldaddress = await models.Address.findByPk(addressId);
  if (!oldaddress) {
    let {
      firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      zipcode,
      country,
    } = req.body;

    let newAdress = await models.Address.create({
      firstName,
      lastName,
      address,
      email,
      mobile,
      city,
      state,
      zipCode: zipcode,

      country,
      isDefault: false,
      userId: userId,
    });
    oldaddress = newAdress;
  }
  let cart = req.session.cart;
 

  cart.paymentMethod = req.body.payment;
  cart.shippingAddress = `${oldaddress.firstName} ${oldaddress.lastName} ${oldaddress.address} ${oldaddress.city} ${oldaddress.state} ${oldaddress.zip} ${oldaddress.country}`;
  switch (req.body.payment) {
    case "PAYPAL":
      saveOrder(req, res, "PAID");
      break;
    case "COD":
      saveOrder(req, res, "PENDING");
      break;
    default:
      res.status(500).send("Invalid payment method");
  }
};
async function saveOrder(req, res, status) {
  let userId = req.user.id;
  let { items, ...others } = req.session.cart.getCart();
  let order = await models.Order.create({
    userId: userId,
    status: status,
    ...others,
  });
  let orderDetails = [];
  items.forEach((item) => {
    orderDetails.push({
      orderId: order.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      total: item.total,
    });
  });
  await models.OrderDetail.bulkCreate(orderDetails);
  req.session.cart.clear();

  res.status(200).render("error", { message: "Order placed", quantity: 0});
}
module.exports = controller;
