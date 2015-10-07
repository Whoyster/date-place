var map = require('./daum-map.js'); 

exports.get_loc_info=function(loc_name, store_name) {
	search_query = loc_name + store_name;

	map.get_map_info(search_query, function(loc_info) {
			console.log( loc_info["confirmid"] + "\n"
						+ loc_info["x"] + "\n"
						+ loc_info["y"] + "\n"
			)
	
		}
	);
}
