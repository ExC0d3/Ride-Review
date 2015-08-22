var Ride = require('../model/Ride.js');
var name;


exports.show = function(req, res) {
	res.render('index',{title:"Ride Review"});
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
		if(key=="license")
		{
			val = value;
		}
		else if(key=="name")
		{
			name = value;
		}
	});

	req.busboy.on('finish',function(){
		Ride.findOne({'plateNum':val, 'name':name},'plateNum',function(err,rider){
			if(rider==null)
			{
				Ride.create({'plateNum':val,'name':name}, function(err,test){
					if(err) throw err;
					console.log("New Auto Rider Created");
				});

			} else {

				console.log("Rider Present ID="+rider.plateNum);


			}
		});
});
	res.redirect('review');
}


exports.review = function(req, res){
	res.render('review',{title:"Ride Review"});

}

exports.reviewStore = function(req, res){
	req.pipe(req.busboy);
	var email;
	var rating;
	var review;
	var condition;
	var behaviour;
	req.busboy.on('field', function(key,value){
		
		if(key='email')
		{
			email=value;
		}else if(key=='condition')
		{
			condition=value;
		}else if(key=='behaviour')
		{
			behaviour=value;
		}else if(key=='review')
		{
			review = value;
		}else if(key=='rating')
		{
			rating = value;
		}

	});

	req.busboy.on('finish',function(){
		console.log("Finished parsing form");
		var object = {
			"email":email,
			"Review":review,
			"Condition":condition,
			"Behvaiour":behaviour,
			"Rating":rating
		}

		Ride.findOne({"name":name},function(err,rider){
			
			if(err) throw err;

			if(rider==null)
			{
				res.send('Invalid Session');
				res.redirect('/');
			}
			else
			{
				console.log(rider);
				rider.person.push(object);
				rider.save(function(err){
					if(err) throw err;
					console.log("Record Updated Succesfully");
					res.send("Thank you for reviewing");
					res.redirect('/');
				});


			}
		});
		
	});
}
