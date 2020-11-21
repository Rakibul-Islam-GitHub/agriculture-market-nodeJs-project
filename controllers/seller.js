const express       	= require('express');
const multer            = require('multer');
const path              = require('path');
const sellerModel		= require.main.require('./models/sellerModel');
const { check, validationResult } = require('express-validator');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/');
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

	
	res.render('seller/additems', {success: ''});

});

router.post('/additem', upload.single('pic'), [
    check('title').not().isEmpty().withMessage('Please enter a product title'),
	check('price', 'Price should be numeric').isNumeric(),
	check('description', 'Enter a product description').not().isEmpty()
	
    
  ], function(req, res){

	const errors = validationResult(req);
	console.log(errors);
	let success =0;
	
	

    if (!errors.isEmpty()) {
		alerts = errors.array();
		res.render('seller/additems', {alerts, success: ''});
      
    } else{
		let item={
			//sellerId : req.params.id,	
			title : req.body.title,
			price : req.body.price,
			description: req.body.description,
			image: req.file.filename
			
	
		};
		sellerModel.insert(item, function(status){

			if(status){
				
				
				res.render('seller/additems', {success : 'Item addedd successfully'});
			}else{
				//res.redirect('/');
	
			}
	
		});



		
		

		
		

	}

});

router.get('/manageitem', function(req, res){

	sellerModel.getAll(function(results){

        if(results.length >0){
          
		res.render('seller/manageitem', {items: results});
		

        }
		
	});

	
	

});

router.post('/manageitem/delete', function(req, res){
	
	//console.log(req.body.itemid);
	let id= req.body.itemid;
	sellerModel.delete(id, function(status){
        if(status){
			console.log('item deleted');
			res.redirect('/seller/manageitem');
			res.send('done');
        }else{
            // res.send('<h1>Something wrong! Try again </h1>');
        }

        
        
	});

	 
	 res.send('work');
 
 });

router.post('/manageitem/delete/:id', function(req, res){
   
	
	res.send('word');

});

router.get('/manageitem/edit/:id', function(req, res){
	let id= req.params.id;

	   sellerModel.getById(id, function(results){
		
		var title = results[0].title;
		var price = results[0].price;
		var description = results[0].description;
		
		


		res.render('seller/edititem', {title: title, price: price,  description: description});

		
	});
	 
	 
 
 });

 router.post('/manageitem/edit/:id', upload.single('pic'), function(req, res){

	//console.log(req.file.filename);

    let item={
		id : req.params.id,	
        title : req.body.title,
        price : req.body.price,
        description: req.body.description,
        image: req.file.filename
        

    };
    console.log(item);

        sellerModel.update(item, function(status){
        if(status){
            console.log('item updated');
            res.redirect('/seller/manageitem');
        }else{

        }

    });

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

