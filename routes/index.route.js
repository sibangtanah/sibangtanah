var express = require('express');
var router = express.Router();

// Require controller modules.
var indexController = require('../controllers/index.controller');

// Get Index Page from Asset Controller
router.get('/', indexController.totalAsset);

module.exports = router;