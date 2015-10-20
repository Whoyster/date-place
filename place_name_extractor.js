
var fs = require("fs");

var jsdom = require('node-jsdom');
var jquery = fs.readFileSync("./jquery.js", "utf-8");


function extract(url, callback){
	jsdom.env({
		url:url,
		src:[jquery],
		done:function(errors, window){
			var placename = window.$("div.map p.tit").html();
			callback(placename);
		}
	});
};

extract('http://m.blog.naver.com/k44smy/100112294346', function(result){ console.log(result) });