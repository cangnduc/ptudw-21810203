const {body, validationResult} = require("express-validator");

function getErrorMessage(req) {
  let errors = validationResult(req);
  let message = "";
  if (!errors.isEmpty()) {
    let errorsArray = errors.array();
    errorsArray.forEach((error) => (message += error.msg + "<br>"));
    return message;
  }
  return null;
 
}
module.exports = {body, getErrorMessage};