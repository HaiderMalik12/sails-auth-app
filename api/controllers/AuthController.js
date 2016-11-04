module.exports ={

  login: function (req, res) {

    var email = req.param('email');
    var password = req.param('password');

    //make sure email is provided
    if (!req.param('email')) {
      return res.badRequest({err:'Please provide your email address'});
    }

    //make sure password is provided
    if (!req.param('password')) {
      return res.badRequest({err:'Please provide your password'});
    }

    //make sure email is valid
    if (!(util.emailValidator.validate(email))) {
      return res.badRequest({error: 'Email is not valid'});
    }

    Account.findOne({
      email: email,
      // status_id: {'!': Status.DELETED}
    }).exec(function (err, user) {
      if (!user) {
        return res.unauthorized({err: 'Invalid email or password'});
      }

      Account.checkPassword(password, user, function (err, valid) {
        if (err) {
          return res.unauthorized({err: 'Invalid email or password'});
        }

        if (!valid) {
          return res.unauthorized({err: 'Invalid email or password'});
        }

           School
             .findOne({account:user.id})
             .then(school =>{

              school.email = user.email;

              var tokenExpiry = !req.param('remember') || req.param('remember') == 'false' ? '1 day' : '7 days';

              var rsp = {
                school: school,
                token: jwToken.issue({
                  school_id: school.id,
                  accountId: user.id
                }, tokenExpiry)
              };

              return res.ok(rsp);

             }).catch(res.unauthorized);


      });
    });
  }
}
