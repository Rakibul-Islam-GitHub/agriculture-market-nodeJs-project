const db = require('./db');

module.exports= {

	
	
	getById: function(id, callback){
		var sql = 'select * from items where sellerid = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	}, 
	getByProductId: function(id, callback){
		var sql = 'select * from items where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	}, 
	

	getAll: function(callback){
		var sql = "select * from items";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getSearch : function(content, callback){
		var sql = 'select * from items where title like "%'+content+'%" ';
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	getcomment: function(id, callback){
		var sql = 'select * from comments where productid = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	}, 

	
	insert: function(item, callback){

		let sql= 'insert into comments (customerid, productid, sellerid, date, time, comment) values ("'+item.customerid+'","'+item.pid+'", "'+item.sellerid+'","'+item.date+'", "'+item.time+'", "'+item.comment+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});

	},

	insertOrder : function(item, callback){

		let sql= 'insert into orders (pname,customerid, productid, price, sellerid, date, time, status) values ("'+item.pname+'", "'+item.customerid+'","'+item.productid+'", "'+item.price+'", "'+item.sellerid+'","'+item.date+'", "'+item.time+'", "incomplete")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});

	},
	
	
	delete: function(id, callback){
		let sql= 'delete from items where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}