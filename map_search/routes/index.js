var express = require('express');
var router = express.Router();
var map = require('./daum-map.js'); 

/* GET home page. */
router.get('/', function(req, res, next) {
		//console.log(res)
		map.get_map_id(req.query["loc"], function(loc_id) {
			url = "http://m.map.daum.net/actions/detailInfoView?id=" + loc_id
			res.redirect(url)
			}
			);
		//res.render('index', { title: 'hello ' + req.query["abc"] });
		}
	  );

module.exports = router;
