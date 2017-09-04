//template/structure/model of document for shortURL
const mongoose = require('mongoose');

//generate schematics
var urlSchema = mongoose.Schema({
	original_url: String,
	short_url: String
}, {timestamps: true});

//											collection name, schematics name
var ModelClass = module.exports = mongoose.model('shortUrl', urlSchema);