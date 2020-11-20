const express 	= require('express');
const userModel		= require.main.require('./models/sellerModel');
const { check, validationResult } = require('express-validator');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/dashboard', function(req, res){
	res.render('seller/dashboard');

});
router.get('/additem', function(req, res){

	
	res.render('seller/additems');

});

router.get('/manageitem', function(req, res){

	
	res.render('seller/manageitem');

});

router.post('/manageitem/delete', function(req, res){
   console.log('ajax worked on delete item');
	
	res.send('word');

});

router.get('/manageitem/edit', function(req, res){
	console.log('ajax worked on delete item');
	 
	 res.render('seller/edititem');
 
 });

router.get('/comments', function(req, res){
	res.render('seller/comments');

});

router.get('/message', function(req, res){
	
	res.render('seller/message');

});




router.get('/edit/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		console.log(results[0].name);
		var empname = results[0].name;
		var empcompany = results[0].company;
		var empcontact = results[0].contact;
		var empusername = results[0].username;
		var emppassword = results[0].password;


		res.render('admin/edit', {name: empname, company: empcompany, contact: empcontact, username: empusername, password: emppassword});

		
	});
  
});

router.post('/edit/:id', [
    check('name').not().isEmpty().withMessage('Please fill all fields!'),
	check('password', 'Please enter Your password ').not().isEmpty(),
	check('company').not().isEmpty().withMessage(' can not be null'),
	check('contact').not().isEmpty().withMessage('This field can not be null'),
	check('username').not().isEmpty().withMessage('This field can not be null'),
    
  ],  (req, res)=>{

	const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
		
      return res.status(422).json(errors.array());
    } else{
		let user={
			id : req.params.id,
			name : req.body.name,
			company : req.body.company,
			contact : req.body.contact,
			username: req.body.username,
			password: req.body.password
			
	
		};
		console.log(user);
	
		userModel.update(user, function(status){
	
	
			if(status){
				console.log('user updated');
				res.redirect('/home/employerlist');
			}else{
	
			}
	
		});

	}

	
	
	// res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		console.log(results[0].name);
		var empname = results[0].name;
		var empcompany = results[0].company;
		var empcontact = results[0].contact;

		res.render('admin/delete', {name: empname, company: empcompany, contact: empcontact});

		
	});


	
	
});

router.post('/delete/:id', (req, res)=>{

	let id= req.params.id;


    userModel.delete(id, function(status){
        
        res.redirect('/home/employerlist');
	});
	// res.redirect('/home/employerlist');
});

router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/employerlist', {users: results});
	});

})

module.exports = router;

