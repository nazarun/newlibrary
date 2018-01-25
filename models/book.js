var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	author: {type: String, required: true},
	title: {type: String, required: true},
	description: {type: String, required: true},
	status: {type: String, required: true},
	//fileUpload: {type: String}	 
});

//a virtual for getting the URL of specific book records
BookSchema.virtual('url').get(function(){
	return '/books/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);