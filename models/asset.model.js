var mongoose = require('mongoose');

//Define a Schema
var Schema = mongoose.Schema;

var AssetSchema = new Schema({
	uid: {
		type: Number,
		required: true
	},
	nama: {
		type: String,
		required: true
	},
	luas: {
		type: Number,
		required: true
	},
	desa: {
		type: String,
		required: true
	},
	kecamatan: {
		type: String,
		required: true
	},
	kategori: {
		type: String,
		required: true
	},
	jenis: {
		type: String,
		required: true
	},
	tahun_perolehan: {
		type: Number
	},
	hak: {
		type: Number
	},
	nomor_sertifikat: {
		type: Number
	},
	tanggal_sertifikat: {
		type: Date
	},
	asal_perolehan: {
		type: String
	},
	skd: {
		type: String
	},
	latitude: {
		type: String,
		required: true
	},
	longitude: {
		type: String,
		required: true
	},
	papanisasi: Boolean,
	penggunaan: {
		type: Schema.Types.ObjectId,
		ref: 'Usage'
	}}, {
	collection: 'asset'
});

// Virtual properties for URL
AssetSchema
.virtual('url')
.get(function () {
  return '/peta/aset/' + this._id;
});

AssetSchema
.virtual('url_katalog')
.get(function () {
  return '/katalog/aset/' + this._id;
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Asset', AssetSchema );
