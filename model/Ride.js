var mongoose = require('mongoose');
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/home';


console.log("Attempting to start Mongo Server");
var db = mongoose.connect(uristring);




var Ride = new mongoose.Schema({
	person:{
		name:[String],
		email:[String],
		Review:[String],
		Condition:[String],
		Behaviour:[String],
		Rating:[Number]
	},

	vehicle:{
		license:String,
		owner:String,
		age:String,
		Rating:Number
	}

});




module.exports = mongoose.model('Ride', Ride,'myRides');



