var util = require('util');
var http = require('http');

exports.get_map_info=function(query, callback) {
	var encoded_name = encodeURI(query);
	var query_url = util.format('/mapsearch/map.daum?q=%s&msFlag=A&sort=0', encoded_name);
	//console.log(query_url);

	var options = {
			host: 'map.search.daum.net',
      path: query_url,
      headers: {'referer': 'http://map.daum.net/'}
	};

	 map_cb = function(response) {
		var s_content = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
				s_content += chunk;
				});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
				j_obj = JSON.parse(s_content)
				//console.log(j_obj["place"][0]["confirmid"])
				loc_info = j_obj["place"][0]
				console.log("store info:")
				console.log(loc_info)
				console.log("--------------------");

				callback(loc_info)
				});
	}

	http.request(options, map_cb).end()
}

//'http://map.search.daum.net/mapsearch/map.daum?q=%EC%9D%B8%EA%B3%84%EB%8F%99%20%EB%8D%94%EB%A7%8C%EC%A1%B1&msFlag=A&sort=0' --referer 'http://map.daum.net/'

//"http://m.map.daum.net/actions/detailInfoView?id=13143003"
