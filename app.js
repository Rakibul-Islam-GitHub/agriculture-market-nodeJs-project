//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');


const logout			    = require('./controllers/logout');
const seller				= require('./controllers/seller');



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



//router
app.get('/', (req, res)=>{
	res.cookie('uname', 'rakibul');
	

	res.render('seller/dashboard', {productcount :'3'});
	
	
});
app.get('/logout2', (req, res)=>{
	res.clearCookie('uname');
	req.session.userid= '';
	console.log('get ajax call from dashboard');
	res.redirect('/');
	
	
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});