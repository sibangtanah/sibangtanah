var Asset = require('../models/asset.model');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// SHOW CATALOG (GET ALL)

exports.catalog = function(req, res) {
	Asset.find({})
	.exec(function (err, results) {
		if (err) {
			return next(err);
		}
		else { 
			res.render('katalog', {
				catalog: results
			});
		};
	});
};

// UPDATE GET

exports.asetUpdateGet = function(req, res, next) {
    Asset.findById(req.params.id)
    .exec(function (err, asset) {
      if (err) { return next(err); }
      if (asset==null) { // No results.
          var err = new Error('Aset tidak ditemukan');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('katalog-aset', { title: 'Aset:', asset:  asset});
    })

};

// UPDATE POST, Handle book update on POST

exports.asetUpdatePost = [
  
    // Validate fields.
    body('nama', 'Nama aset tidak boleh kosong.').isLength({ min: 1 }).trim(),
    body('desa', 'Nama desa tidak boleh kosong.').isLength({ min: 1 }).trim(),
    body('kecamatan', 'Nama kecamatan tidak boleh kosong.').isLength({ min: 1 }).trim(),
    body('luas', 'Luasan tidak boleh kosong.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('nama').trim().escape(),
    sanitizeBody('desa').trim().escape(),
    sanitizeBody('kecamatan').trim().escape(),
    sanitizeBody('luas').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var aset = new Asset(
          { nama: req.body.nama,
            desa: req.body.desa,
            kecamatan: req.body.kecamatan,
            luas: req.body.luas,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Asset.findByIdAndUpdate(req.params.id, aset, {}, function (err,thebook) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(thebook.url);
                });
        }
    }
];
