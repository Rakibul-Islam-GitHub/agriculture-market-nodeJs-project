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

	
	insert: function(item, callback){

		let sql= 'insert into items (sellerid, title, price, description, image) values ("'+item.sellerid+'","'+item.title+'", "'+item.price+'", "'+item.description+'", "'+item.image+'")';
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