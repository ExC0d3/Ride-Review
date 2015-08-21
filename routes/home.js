var Ride = require('../model/Ride.js');

exports.show = function(req, res) {
	res.render('home',{title:"Ride Review"});
}