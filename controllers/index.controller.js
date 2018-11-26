var Asset = require('../models/asset.model');

var async = require('async');

exports.totalAsset = function(req, res) {   
	async.parallel({
		assetCount: function(callback) {
			Asset.countDocuments({}, callback);
		},
	}, function(err, results) {
		res.render('index', { 
			title: 'Recorded Asset', 
			error: err, 
			data: results
		});
	});
};