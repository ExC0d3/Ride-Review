var Ride = require('../model/Ride.js');

exports.show = function(req, res) {
	res.render('home',{title:"Ride Review"});
}

exports.form = function(req,res) {
	res.render('form',{title:"Ride Review"});
}

exports.submit = function(req,res){
	req.pipe(req.busboy);
	var val;
	req.busboy.on('field',function(key,value){
		console.log("Key: " + key);
		console.log("Value: "+value);
		val = value;
	});

	req.busboy.on('finish',function(){
		Ride.create({
			plateNum: val,
			Review: "",
			Condition: "",
			Behaviour: "",
			Rating: 0
		},function(err){
			if(err) throw err;
			res.redirect('/review');
		});
	});
}
