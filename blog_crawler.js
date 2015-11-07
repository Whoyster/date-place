/*
main for crawling blog content
*/
var fs = require('fs');
var google = require('google-query');
var sqlite3 = require("sqlite3").verbose();
var sleep = require('sleep');
var async = require('async');
var place_name_extractor = require('./place_name_extractor.js');
var map = require('./map_search/daum-map.js');
var db = require('./map_search/dpdb.js');

if (process.argv.length < 4) {
    console.log("usage : node blog_url_crawler.js <page-MAX> <place.txt>");
    process.exit();
}
var page_max = process.argv[2];
var place_txt = process.argv[3];
var place_list = fs.readFileSync(place_txt,'utf-8').split('\n');
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
list_add = function(place, page ,g_query){
    obj = function (callback){
            console.log(g_query);
            google.search(g_query, page, function(url){
                next_time = randomIntInc(60000,120000);
                console.log("crawler after : " + next_time + " ms")
                setTimeout(function() {
                    callback(null,[place,url]);
                },next_time);
            });
        };
    google_list.push(obj);
};

for (var i in place_list) {    
    for(var j = 0 ; j < page_max ; j++){
        var place = place_list[i];
        var g_query = place + post_query;
        console.log('query : "' + g_query + '"');
        list_add(place, j, g_query);
    }
}
console.log('--------------------------');
console.log(google_list);

db.init();

async.series(google_list, 
    function(err, results){
        blog_data = arguments[1]
        console.log(blog_data);
        for(var i in blog_data){
            place = blog_data[i][0];
            url_list = blog_data[i][1];
            
            for(var j in url_list){
                place_name_extractor.extract(place, url_list[j], place_name_extract_callback);
            }

            //console.log(place);
            //console.log(url_list.length);
        }
    }
);

//db.close();

function place_name_extract_callback(loc_name, store_name, url){

    if(store_name == undefined)
        return;
    else
        console.log(loc_name +" : "+store_name);

    var search_query = loc_name + " " + store_name;
    map.get_map_info(search_query, function(loc_info) {
            var values = [ loc_info["confirmid"], loc_info["address"], loc_info["name"], loc_info["last_cate_name"], loc_info["x"], loc_info["y"]];
            db.insert_store(values, function(store_id){
                console.log("store id: " + store_id);
                db.insert_blog([url,loc_name,store_id]); 
            }); 
    });
}

