/*
main for crawling blog content
@author becxer
@email becxer87@gmail.com
*/
var fs = require('fs');
var google = require('./google/google.js');
var sqlite3 = require("sqlite3").verbose();
var sleep = require('sleep');
var async = require('async');

//read place list from origin place.txt
var place_list = fs.readFileSync('place','utf-8').split('\n');
var post_query = fs.readFileSync('post-query','utf-8');
post_query = post_query.substring(0,post_query.length-1);
place_list.pop();

console.log('place count : ' + place_list.length);
console.log('place list : ' + place_list)
console.log('post query : ' + post_query);
console.log('------------------------------');

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

google_list = [];
list_add = function(place, g_query){
	obj = function (callback){
			console.log(g_query);
			google.search(g_query, j, function(url){
				next_time = randomIntInc(6000,12000);
				console.log(next_time)
				setTimeout(function() {
					callback(null,[place,url]);
				},next_time);
			});
		};
	google_list.push(obj);
};

for (var i in place_list) {	
	for(var j = 0 ; j < 1 ; j++){
		var place = place_list[i];
		var g_query = place + post_query;
		console.log('query : "' + g_query + '"');
		list_add(place, g_query);
	}
}
console.log('--------------------------');
console.log(google_list);

db_insert = function(db, place ,url) {
	db.serialize(function(){
		var stmt = db.prepare("INSERT INTO blog(blog_area, blog_url) VALUES(?,?)");
		stmt.run(place, url); 
		stmt.finalize();
	});
}

async.series(google_list, 
	function(err, results){
		url_list = arguments[1]
		console.log(url_list);
		var db = new sqlite3.Database('dpdb');
		for(var i in url_list){
			place = url_list[i][0];
			for(var j in url_list[i][1]){
				db_insert(db,place,url_list[i][1][j]);			
			}
		}
		db.close();
	}
);

