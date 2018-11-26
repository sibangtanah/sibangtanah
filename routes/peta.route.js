var express = require('express');
var router = express.Router();

// Require controller mode
var mapsController = require('../controllers/maps.controller');

// GET home page. 
router.get('/', mapsController.catalog);

// GET place id
router.get('/aset/:id', mapsController.assetDetail)

module.exports = router;