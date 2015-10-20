/*
test code for google searching 

@author becxer
@email becxer87@gmail.com
*/

var google = require('./google.js');
var fs = require('fs');
var urllistf = undefined; 

var callback_for_result = function(url){
    fs.appendFile(urllistf, url, function (err) {
        if(err) {
            return console.log(err);
        }
    });
};

if (process.argv.length < 5 ) {
    console.log("usage : node google-test.js 'search query' page_num url_list_file");    
	process.exit();
}else if (process.argv.length == 5){
    query = process.argv[2];
    page_num = process.argv[3];
    urllistf = process.argv[4];
    console.log("saving into.. " + urllistf);
    fs.writeFile(urllistf, "", function(err) {
        if(err) {
            return console.log(err);
        }
    });
    for (var i = 0 ; i <= page_num ; i++){
        google.search(query,i,callback_for_result);
    }
}

