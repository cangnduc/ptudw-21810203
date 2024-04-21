"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const models = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
// called when user logs in to get user data from database and store it in req.user object
passport.deserializeUser(async (id, done) => {
  try {
    let user = await models.User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
// passport middleware to authenticate user
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, //pass request object to callback
    },
    async (req, email, password, done) => {
      if (email) email = email.toLowerCase();
      try {
        if (!req.user) {
          let user = await models.User.findOne({ where: { email: email } });
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found")
            );
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password")
            );

          }
          return done(null, user);
        }
        done(null, req.user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      if (email) email = email.toLowerCase();
      try {
        let user = await models.User.findOne({ where: { email: email } });
        if (user) {
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken")
          );
        }
        let newUser = await models.User.create({
          email: email,
          password: bcrypt.hashSync(password, 8),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          mobile: req.body.mobile,
          role: "user",
        });
        done(null, false,req.flash("signupMessage", "User created successfully"));
      } catch (err) {
        return done(err);
      }
    }
  )
);
module.exports = passport;
