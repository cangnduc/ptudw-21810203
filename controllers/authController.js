let controller = {};
const passport = require("./passport");
const models = require("../models");
controller.show = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res
    .status(200)
    .render("login", {
      message: req.flash("loginMessage"),
      returnUrl: req.query.returnUrl,
      signupMessage: req.flash("signupMessage"),
    });
};
controller.login = (req, res, next) => {
  let keepSignIn = req.body.keepSignIn;
  let returnUrl = req.body.returnUrl ? req.body.returnUrl : "/user/my-account";
  let cart = req.session.cart;
  passport.authenticate("local-login", (error, user) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    //console.log(user);
    if (!user) {
      return res.status(200).redirect(`/user/login?returnUrl=${returnUrl}`);
    }

    req.logIn(user, (error) => {
      if (error) {
        console.log(error);
        return next(error);
      }

      req.session.cookie.maxAge = keepSignIn ? 30 * 24 * 60 * 60 * 1000 : null;
      req.session.cart = cart;
      console.log(req.session.cookie.maxAge);
      return res.redirect(returnUrl);
    });
  })(req, res, next);
};
controller.logout = (req, res, next) => {
  let cart = req.session.cart;
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.cart = cart;
    res.redirect("/");
  });
};
controller.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/user/login?returnUrl=${req.originalUrl}`);
};
controller.register = async (req, res, next) => {
  let returnUrl = req.body.returnUrl ? req.body.returnUrl : "/user/my-account";
  let cart = req.session.cart;
  passport.authenticate("local-signup", (error, user) => {
    if (error) {
      //console.log(error);
      return next(error);
    }
    if (!user) {
      return res.status(200).redirect(`/user/login?returnUrl=${returnUrl}`);
    }
    req.logIn(user, (error) => {
      if (error) {
        //console.log(error);
        return next(error);
      }
      req.session.cart = cart;
      return res.redirect(returnUrl);
    });
  })(req, res, next);
};
controller.showForget = (req, res) => {
  res.status(200).render("forgetPassword");
};
controller.forget = async (req, res) => {
  let email = req.body.email;
  let user = await models.User.findOne({ where: { email: email } });
  if (!user) {
    return res.render("forgetPassword", { message: "Email not found" });
  }
  let { sign } = require("./jwt");
  let host = req.get("host");
  //console.log(host);
  let resetLink = `${req.protocol}://${host}/user/reset?token=${sign({
    email: email,
  })}&email=${email}`;
  //console.log(resetLink);
  let { sendForgetPasswordEmail } = require("./mail");
  sendForgetPasswordEmail(user, host, resetLink)
    .then((info) => {
      console.log(info);
      return res.status(200).render("forgetPassword", { done: true });
    })
    .catch((error) => {
      console.log(error.statusCode);
      return res
        .status(200)
        .render("forgetPassword", { message: "Error sending email" });
    });
};
controller.showReset = (req, res) => {
  let token = req.query.token;
  let email = req.query.email ? req.query.email : "";
  let { verify } = require("./jwt");
  //let decoded = verify(token);
  if (!token || !verify(token)) {
    //console.log(decoded.expired, decoded.email, email)
    return res.status(200).render("resetPassword", { expired: true });
  }
  res.status(200).render("resetPassword", { email: email, token: token });
};
controller.resetPassword = async (req, res) => {
  let { verify } = require("./jwt");
  let token = req.body.token;
  let email = req.body.email;
  let decoded = verify(token);
  if (decoded.email.email != email) {
    console.log(decoded.email.email, email)
    return res.status(200).render("resetPassword", { message: "Invalid token" });
  }
  let user = await models.User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(200).render("error", { message: "User not found" });
  }
  let bcrypt = require("bcrypt");
  let password = await bcrypt.hash(req.body.password, 8);
  user.password = password;
  await user.save();
  res.status(200).render("resetPassword", { done: true});
}
module.exports = controller;
