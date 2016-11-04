/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken'),
    secret = 'KeEs84fF';

// Generates a token from supplied payload
module.exports.issue = function (payload, expiresIn) {
    if(!expiresIn)
        expiresIn = 10800; // in seconds
    return jwt.sign(
        payload,
        secret, // Token Secret that we sign it with
        {
            expiresIn: expiresIn // Token Expire time
        }
    );
};

// Verifies token on a request
module.exports.verify = function (token, callback) {
    return jwt.verify(
        token, // The token to be verified
        secret, // Same token we used to sign
        {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        callback //Pass errors or decoded token to callback
    );
};
