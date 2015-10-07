
var readline = require('readline');
var map = require('./daum-map.js');
var db = require('./dpdb.js');

console.log(process.argv.length);

if(process.argv.length < 4) {
	console.log("usage: " + process.argv[1] + " [location] [store_name]");
	process.exit();
}

var loc_name = process.argv[2];
var store_name = process.argv[3];
var search_query = loc_name + " " + store_name;

map.get_map_info(search_query, function(loc_info) {
		db.init();
		var values = [loc_info["address"], loc_info["name"], loc_info["last_cate_name"], 
			loc_info["confirmid"], loc_info["x"], loc_info["y"]];
		db.insert_store(values); 
		db.close();
});
