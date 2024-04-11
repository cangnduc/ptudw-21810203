const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
let { body, validationResult } = require("express-validator");
const e = require("express");
router.get("/checkout", controller.checkOut);
let checkOut = [
  body("addressId").isNumeric().withMessage("Address is required"),
  body("payment")
    .isIn(["COD", "PAYPAL"])
    .withMessage("Payment method is required"),
  body("firstName")
    .isLength({ min: 3, max: 25 })
    .withMessage("First Name is greater than 3 and less than 25 characters"),
  body("lastName")
    .isLength({ min: 3, max: 25 })
    .withMessage("Last Name is greater than 3 and less than 25 characters"),
  body("email")
    .isEmail()
    .withMessage("It is not an email")
    .notEmpty()
    .withMessage("Email is required"),
  body("mobile")
    .isMobilePhone()
    .withMessage("It is not a mobile")
    .notEmpty()
    .withMessage("Mobile is required"),

  body("address")
    .isLength({ min: 3, max: 255 })
    .withMessage("Address is required"),
  body("city").isLength({ min: 3, max: 25 }).withMessage("City is required"),
  body("state").isLength({ min: 3, max: 25 }).withMessage("State is required"),
  body("zipcode").isPostalCode("any").withMessage("Zipcode is required"),
  body("country")
    .isLength({ min: 3, max: 25 })
    .withMessage("Country is required"),
];

router.post(
  "/placeOrders",
  checkOut,
  (req, res, next) => {
    const errors = validationResult(req);
    //console.log(errors.array());
    console.log(req.body);
    if (req.body.addressId == 0 && !errors.isEmpty()) {
      let errorsArray = errors.array();

      let message = "";
      errorsArray.forEach((error) => (message += error.msg + "<br>"));
      //console.log(message);

      return res.status(200).render("error", { message });
    }
    next();
  },

  controller.placeOrders
);
module.exports = router;
