var express = require('express');
var router = express.Router();

var statisticsController = require('../controllers/statistics.controller');

// app
// router.get('/', function(const ,  = require(', ');))

router.get('/', function(req, res) {
	res.render('notifikasi')
});

module.exports = router;
