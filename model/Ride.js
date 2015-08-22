var mongoose = require('mongoose');
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/home';


console.log("Attempting to start Mongo Server");
var db = mongoose.connect(uristring);

var Person = new mongoose.Schema({
	
	email: String,
	Review: String,
	Condition: String,
	Behaviour: String,
	Rating: Number
});


var schema = new mongoose.Schema({
	name: String,
	plateNum: [String],
	person: [Person]
});


module.exports = mongoose.model('Ride', schema);