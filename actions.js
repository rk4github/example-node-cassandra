module.exports = {
	InsertContact : function (req, res, client){
		client.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				client.execute("INSERT INTO contact (email, name, phone, address, city) VALUES (?,?,?,?,?)", [post.email, post.name, post.phone, post.address, post.city], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	UpdateContact : function (req, res, client){
		client.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				client.execute("UPDATE contact SET name = ?, phone = ?, address = ?, city = ? WHERE email = ?", [post.name, post.phone, post.address, post.city, post.contactEdit], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	DeleteContact : function (req, res, client){
		client.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
				client.execute("DELETE FROM contact WHERE email = ?", [post.contactDel], function(err, results){
					res.redirect('/');
				});
		    }
		});
	},
	LoadContacts : function (req, res, client){
		client.connect(function(err, keyspace){
		    if(err){
		    	throw(err);
		    } else {
		    	var post = req.body;
		    	var query = "SELECT * FROM contact";
		    	if(typeof(req.query.email) != "undefined"){
		    		query += " WHERE email = '"+req.query.email+"'";
		    	}
				client.execute(query, [], function(err, results){
					var data = [];
					results.rows.forEach(function(row){
						if( row ){
						    var obj = row;					  	
					  	    data.push(obj);
						}
					});
					res.send(data);
				});
		    }
		});
	}
}
