var express = require('express');
var router = express.Router();


// Get Index Page from Asset Controller
router.get('/', function(req, res) {
	res.render('notifikasi')
});

module.exports = router;
