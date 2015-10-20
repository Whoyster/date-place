/*
main for crawling blog content
@author becxer
@email becxer87@gmail.com
*/
var fs = require('fs');
var google = require('./google/google-search.js');
var sqlite3 = require("sqlite3").verbose();
var sleep = require('sleep');
var db = new sqlite3.Database('dpdb');

//read place list from origin place.txt
var place_list = fs.readFileSync('place.txt','utf-8').split('\n');
place_list.pop();
console.log(place_list)
console.log('place count : ' + place_list.length);

//google search sample
post_query = " 근사한|추천|분위기|데이트|이색|색다른 카페|식당|레스토랑|한식|일식 site:tistory.com | site:blog.naver.com"
for (var i in place_list) {	
	for(var j = 0 ; j < 1 ; j++){
		var place = place_list[i];
		var g_query = place + post_query;
		console.log(g_query);
		google.search(g_query, j+1, function(url){
			console.log(url);
			db.serialize(function(){
				var stmt = db.prepare("INSERT INTO blog(blog_area, blog_url) VALUES(?,?)");
				stmt.run(place,url); 
				stmt.finalize();
			});
			db.close();
		});
	}
}

