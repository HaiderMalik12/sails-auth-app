module.exports.emailValidator = {


  /**
   * It will validate an email
   * @param email
   * @return {boolean}
   */
  validate: function (email) {
    const validator = require("email-validator");

    return validator.validate(email) ? true : false;
  }
};
