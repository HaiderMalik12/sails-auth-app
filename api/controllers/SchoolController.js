"use strict";
module.exports ={

  create:function (req,res) {


    const validParams = ['email','password','account_name','city','post_code','edh_status',
     'edh_charity_id','edh_url'];
    const params = _.pick(req.body,validParams);



   let password = params.password,
       email= params.email,
       account_name=params.account_name,
       account_site= params.account_site,
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

    return res.ok(params);

  }

}
