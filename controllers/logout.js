const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = "";
	//res.cookie('uname', '');
	
	res.clearCookie('uname');
	res.redirect('/');
	res.send('ok');
	
});


module.exports = router;



