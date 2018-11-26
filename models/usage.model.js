var mongoose = require('mongoose');

//Define a Schema
var Schema = mongoose.Schema;

var UsageSchema = new Schema({
	jenis: String,
	pelaku: String,
	durasi: Number,
	nomor_surat: String,
	tanggal_surat: Date
}, {
	collection: 'usage'
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Usage', UsageSchema );
