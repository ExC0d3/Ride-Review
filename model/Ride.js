var mongoose = require('mongoose');
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/home';


console.log("Attempting to start Mongo Server");
var db = mongoose.connect(uristring);



var schema = new mongoose.Schema({
	name: String,
	plateNum: String,
	person: {
		email: String,
		Review: String,
		Condition: String,
		Behaviour: String,
		Rating: Number
	}
});

schema.methods.details = function(){
	console.log("Created Rider");
	console.log("Name: "+this.name);
	console.log("License: "+this.name);
}

module.exports = mongoose.model('Ride', schema);