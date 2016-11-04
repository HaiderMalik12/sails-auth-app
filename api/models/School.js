/**
 * School.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    account_name : { type: 'string' },

    city : { type: 'string' },

    post_code : { type: 'integer' },

    edh_status : { type: 'string' },

    edh_charity_id : { type: 'string' },

    edh_url : { type: 'string' },

    account: {model:'account',required:true,columnName:'account_id'},

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.createdAt;
      delete obj.updatedAt;
    }
  }
};

