const express       	= require('express');
const multer            = require('multer');
const path              = require('path');
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



var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'assets/image/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname)) 
	}
  });
  var upload = multer({ storage: storage });


router.get('/dashboard', function(req, res){
	res.render('seller/dashboard');

});
router.get('/additem', function(req, res){

	
	res.render('seller/additems');

});

router.post('/additem', upload.single('pic'), [
    check('title').not().isEmpty().withMessage('Please enter a product title'),
	check('price', 'Price should be numeric').isNumeric(),
	check('description', 'Enter a product description').not().isEmpty()
	
    
  ], function(req, res){

	const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
		alerts = errors.array();
		res.render('seller/additems', {alerts});
      
    } else{

		console.log('done');
		

		
		

	}

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




router.get('seller/edit/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		

		res.render('seller/edititem', {});

		
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

router.get('seller/itemlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/itemlist', {items: results});
	});

})

module.exports = router;

