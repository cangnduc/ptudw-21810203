const express = require("express");
const router = express.Router();
const { body, getErrorMessage } = require("../controllers/validator");
const controller = require("../controllers/authController");

router.get("/login", controller.show);
router.post(
  "/login",
  body("email")
    .isEmail()
    .withMessage("It is not an email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password is required and greater than 6 characters"),
  (req, res, next) => {
    let message = getErrorMessage(req);

    if (message) {
      return res.status(200).send(message);
      //return res.status(200).render("login",{message});
    }
    next();
  },
  controller.login
);

router.get("/logout", controller.logout);
router.post(
  "/register",
  body("email")
    .isEmail()
    .withMessage("It is not an email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .notEmpty()
    .withMessage("Password is required"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Confirm Password is required"),

  body("firstName")
    .isLength({ min: 3, max: 100 })
    .withMessage("First Name is required and greater than 3 characters"),
  body("lastName")
    .isLength({ min: 3, max: 100 })
    .withMessage("Last Name is required and greater than 3 characters"),
  body("mobile")
    .isMobilePhone()
    .withMessage("It is not a mobile")
    .notEmpty()
    .withMessage("Mobile is required"),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      //return res.status(500).send({ message });
      return res.status(200).render("login", { signupMessage: message });
    }
    next();
  },
  controller.register
);
router.get("/forget", controller.showForget);
router.post(
  "/forget",
  body("email")
    .isEmail()
    .withMessage("It is not an email")
    .notEmpty()
    .withMessage("Email is required"),
  (req, res, next) => {
    let message = getErrorMessage(req);
    if (message) {
      return res.status(200).render("forgetPassword", { message });
    }
    next();
  },
  controller.forget
);
router.get("/reset", 
 
 controller.showReset);
router.post("/reset",

 body("email")
    .isEmail()
    .withMessage("It is not an email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .notEmpty()
    .withMessage("Password is required"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Confirm Password is required"),
    (req, res, next) => {
      let message = getErrorMessage(req);
      if (message) {
        return res.status(200).render("resetPassword",{message});
      }
      next();
    }
    , controller.resetPassword);
module.exports = router;
