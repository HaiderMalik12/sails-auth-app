/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    email : { type: 'string',required:true,unique:true},

    password : { type: 'string',required:true }
  },
  toJSON: function () {
    var obj = this.toObject();
    delete  obj.password;
    delete obj.createdAt;
    delete obj.updatedAt;
  },
  checkPassword: function (password, user, cb) {
    require('machinepack-passwords').checkPassword({
      passwordAttempt: password,
      encryptedPassword: user.password
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return cb(err, false);
      },
      // Password attempt does not match already-encrypted version
      incorrect: function () {
        return cb(null, false);
      },
      // OK.
      success: function () {
        return cb(null, true);
      }
    });
  }
};

