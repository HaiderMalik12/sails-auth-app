/**
 * tokenAuth
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');

    // We delete the token from param to not mess with blueprints
    //delete req.query.token; Enabled for demo purposes
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  jwToken.verify(token, function (err, token) {
    if (err) {
      return res.json(401, {err: 'Invalid Token'});
    }

    School.findone({id:token.school_id})
      .then(school =>{

        if(!school) return res.unauthorized({err:'No School found'});

        return Account
          .findone({id:school.account})

      }).then(account => {

      if(!account) return res.unauthorized({err:'Invalid Token'});

      req.token = token;
      next();
    }).catch(res.unathorized);

    // Company.findOne({id: token.company, status_id: Status.LIVE}).then((comp)=>{
    //   if(!comp)
    //     throw 'No company found';
    //
    //   return Account.findOne({id: token.id, status_id_friendly: Status.ACTIVE});
    //
    // }).then((acc)=>{
    //   if(!acc)
    //     throw 'Invalid Token';
    //
    //   CompanyLicence.findOne({company: token.company, active: true}, function(err, companyLicence){
    //     if(err || !companyLicence)
    //       return res.unauthorized('No active licence detected for your account. Please contact support for help');
    //
    //     if(!companyLicence.accepted && req.path != '/company/licence/accept')
    //       return res.unauthorized({err: 'Please accept licence agreement to start using the platform', agreement: companyLicence.agreemnt});
    //     token.licence = companyLicence.licence; // licence ID
    //     req.token = token; // This is the decrypted token or the payload you provided
    //     next();
    //   });
    // }).catch((err)=>{
    //   res.json(401, {err: err});
    // });

  });
};
