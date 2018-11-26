var Asset = require('../models/asset.model');
var async = require('async');

exports.catalog = function(req, res) {
	Asset.find({})
	.exec(function (err, results) {
		if (err) {
			return next(err);
		}
		else { 
			res.render('peta', {
				title: 'Recorded Asset',
				catalog: results
			});
		};
	});
};

exports.assetDetail = function(req, res, next) {
    Asset.findById(req.params.id)
    .exec(function (err, asset) {
      if (err) { return next(err); }
      if (asset==null) { // No results.
          var err = new Error('Book copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('peta-aset', { title: 'Book:', asset:  asset});
    })

};