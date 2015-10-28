var sqlite3 = require('sqlite3').verbose();
var util = require('util')
var db;

exports.init=function() {
    db = new sqlite3.Database('./dpdb');// new sqlite3.Database(':memory:'); 
}

exports.close=function() {
    db.close();
}

exports.insert_store=function(values, callback) {
    //console.log(values);
    db.serialize(function() {
        var tbl_name = "store"
        var fields = "(store_daum_id, store_area, store_title, store_type, store_daum_x, store_daum_y)"
        var stmt = db.prepare("INSERT INTO " + tbl_name + fields + " VALUES(?,?,?,?,?,?)");
        stmt.run(values, function(err, row) {
            if(err) 
                console.log("error in inserting: " + err.message);
            }); 
        stmt.finalize();
        
        var id = "store_id"
        db.get(util.format("SELECT %s FROM %s WHERE store_daum_id = %s", id, tbl_name ,values[0]), function(err, row) {
            if(err) {
                console.log("error in select: " + err.message);
            } else if( row != undefined ) {
                callback(row.store_id);
            }
        });
    });
}

exports.insert_blog=function(values) {
    //console.log(values);
    db.serialize(function() {
        var tbl_name = "blog"
        var fields = "(blog_url, blog_area, store_id)"
        var stmt = db.prepare("INSERT INTO " + tbl_name + fields + " VALUES(?,?,?)");
        stmt.run(values, function(err, row) {
            if(err) 
                console.log("error in inserting: " + err.message);
            }); 
        stmt.finalize();
    });
}

