var mongoose = require('mongoose');
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/home';


console.log("Attempting to start Mongo Server");
var db = mongoose.connect(uristring);

var schema = new mongoose.Schema({
	plateNum: Number,
	Review: String,
	Condition: String,
	Behaviour: String,
	Rating: Number
});


module.exports = mongoose.model('Ride', schema);