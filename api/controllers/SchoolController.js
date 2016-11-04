"use strict";
module.exports ={

  create:function (req,res) {


    const validParams = ['email','password','account_name','city','post_code','edh_status',
     'edh_charity_id','edh_url'];
    const params = _.pick(req.body,validParams);



   let password = params.password,
       email= params.email,
       account_name=params.account_name,
       city= params.city,
       post_code= params.post_code,
       edh_charity_id= params.edh_charity_id,
       edh_url= params.edh_url,
       edh_status=params.edh_status;



    if (!password) {

      return res.badRequest({err:'Invalid password field'});
    }

    if (!email) {
      return res.badRequest({err:'Invalid email field'});
    }

    if (!(util.emailValidator.validate(email))) {
      return res.badRequest({err: 'Email is not valid'});
    }

    if(!account_name)
    {
      return res.badRequest({err:'Invalid account_name'});
    }

    if(!edh_charity_id)
    {
      return res.badRequest({err:'Invalid edh_charity_id'});
    }

   util.getEncryptedPassword(password, function(encPassword, err){

     if(!encPassword || err){
        res.forbidden({err: 'Your password is not matched'});
      }

    Account
      .create({email,password:encPassword})
      .then(account =>{

        if(!account) return res.negotiate({err:'Unable to create a new account'})

         return School
           .create({account_name,city,post_code,edh_charity_id,edh_status,edh_url,account:account.id});

      }).then(school =>{

      if(!school) return res.negotiate({err:'Unable to create a new account'});

      return res.json({msg:'Your account has been created successfully!'});

    }).catch(res.negotiate);
   });
  }

}
