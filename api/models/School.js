/**
 * School.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    account_name : { type: 'string' },

    email : { type: 'string' },

    password : { type: 'string' },

    account_site : { type: 'string' },

    city : { type: 'string' },

    post_code : { type: 'integer' },

    edh_status : { type: 'string' },

    edh_charity_id : { type: 'string' },

    edh_url : { type: 'string' }
  }
};

