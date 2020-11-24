//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const sellerModel		= require.main.require('./models/sellerModel');
const productModel		= require.main.require('./models/productModel');


const logout			    = require('./controllers/logout');
const seller				= require('./controllers/seller');
const login				    = require('./controllers/login');
const product			    = require('./controllers/product');



const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/logout', logout);
app.use('/seller', seller);
app.use('/login', login);
app.use('/product', product);



//router
app.get('/', (req, res)=>{

	sellerModel.getAll(function(results){

        if(results.length >0){
		res.render('landingpage/index', {items: results, role:req.cookies['role'] });
		

        }
		
	});
	
	
	
});

app.post('/search', (req, res)=>{

	let content = req.body.query;
	console.log(content);
	productModel.getSearch(content, function(results){

        if(results.length >0){
		  console.log(results);
		  
		res.json(results);
		

        }
		
	});
})
app.get('/logout2', (req, res)=>{
	res.clearCookie('uname');
	req.session.userid= '';
	console.log('get ajax call from dashboard');
	//res.redirect('/login');
	res.send('ok');
	
	
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});