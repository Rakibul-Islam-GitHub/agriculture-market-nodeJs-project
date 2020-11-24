const express 		= require('express');
const { check, validationResult } = require('express-validator');
const sellerModel		= require.main.require('./models/sellerModel');
const loginModel		= require.main.require('./models/loginModel');
const router 		= express.Router();


router.get('/', (req, res)=>{
	if(req.cookies['uname']==''){
		res.render('login/index', {loginalerts: undefined});

	}else if(req.cookies['role']=='seller'){
		res.redirect('seller/dashboard');
	}
	
});

router.post('/',  [
    check('username').not().isEmpty().withMessage('Username can not be empty'),
	
	check('password', 'Password can not be empty').not().isEmpty()
	
    
  ], (req, res)=>{

    const errors = validationResult(req);
	console.log(errors);
	
	
    if (!errors.isEmpty()) {
		loginalerts = errors.array();
		res.render('login/index', {loginalerts});
      
    }else{

        
	var user = {
		username: req.body.username,
		password: req.body.password
	};


	loginModel.validate(user, function(status){

		console.log(status);


		if(status){
            loginModel.getAll(function(results){

				
				if(results[0].role=='admin'){
                    req.session.userid = req.body.username;
					res.cookie('uname', req.body.username);
					res.redirect('/admin/dashboard');
				}else if(results[0].role=='manager'){
					res.cookie('uname', req.body.username);
					res.redirect('/manager/dashboard');
				}else if(results[0].role=='seller'){
                    req.session.userid = req.body.username;
                    console.log( req.session.userid);
					res.cookie('uname', req.body.username);
					res.cookie('role', 'seller');
                    res.redirect('/seller/dashboard');

                }else if(results[0].role=='customer'){
                    req.session.userid = req.body.username;
					res.cookie('uname', req.body.username);
					res.cookie('role', 'customer');
                    res.redirect('/');

                }
			});

		}else{
			res.redirect('/login');

		}
		
	});

    }

}); 

module.exports = router;