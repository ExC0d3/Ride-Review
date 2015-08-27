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


Ride.methods.details = function(){
	console.log("License Number: "+this.vehicle.license);
	console.log("Riders :"+this.person.name);
}

Ride.methods.locate = function(collec,query){
	mongoose.connection.db.collection(collec, function(err, collection){
		if (err) throw err;
		console.log(collection);
		db.collection.find({'vehicle.license':"DL-3C-AF-5998"},function(err,doc){
			if(err) throw err;
			console.log(doc);

		});
	
	});
}


module.exports = mongoose.model('Ride', Ride,'myRides');



