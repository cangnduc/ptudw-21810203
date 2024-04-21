'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = "aweawe";
function sign(email, expiresIn = '30m') {
  return jwt.sign({ email }, process.env.JWT_SECRET || jwtSecret, {
    expiresIn,
  });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || jwtSecret);
  } catch (error) {
    return false;
  }
}

module.exports = { sign, verify };