const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
	original_url: {
		type: String,
		trim: true,
		//unique: true,
		required: true
	},
	short_url: {
		type: String,
		required: true,
		//unique: true
	}

});

//Return the site object and save it at the same time
UrlSchema.methods.saveSite = function() {
	this.save(function(err) {
	  if (err) throw console.error(err);
	  console.log('Url saved successfully!');
	});
};

UrlSchema.methods.getSite = function() {
	return {
		original_url: this.original_url,
		short_url: this.short_url
	};	
};


let Url = mongoose.model('Url', UrlSchema);
module.exports = Url;