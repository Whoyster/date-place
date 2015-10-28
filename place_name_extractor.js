
var fs = require("fs");

var jsdom = require('node-jsdom');
var jquery = fs.readFileSync("./jquery.js", "utf-8");


exports.extract = function (url, callback){
	jsdom.env({
		url:url,
		src:[jquery],
		done:function(errors, window){
			var placename = window.$("div.map p.tit").html();
			if(placename == undefined)
				placename = window.$("#TixIntroMap div:nth-child(2) span:nth-child(3)").html();
			
			if((typeof placename) == 'string')
				placename = placename.trim();
			callback(placename);
		}
	});
};
