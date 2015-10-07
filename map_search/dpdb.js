var sqlite3 = require('sqlite3').verbose();
var db;

exports.init=function() {
	db = new sqlite3.Database('../dpdb');
}

exports.close=function() {
	db.close();
}

exports.insert_store=function(values) {
	//console.log(values);
	db.serialize(function() {
		var tbl_name = "store"
		var tbl_fields = "(store_area, store_title, store_type, store_daum_id, store_daum_x, store_daum_y)"
		try {
			var stmt = db.prepare("INSERT INTO " + tbl_name + tbl_fields + " VALUES(?,?,?,?,?,?)");
			stmt.run(values); 
			stmt.finalize();
		} catch(err) {
			console.log("error in inserting: " + err.message);
		}
		
		console.log("in DB");
		db.each("SELECT * FROM " + tbl_name, function(err, row) {
			console.log(row);
		});
	});
}

