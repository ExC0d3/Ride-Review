var Ride = require('../model/Ride');
var name,license;
var arr = [];
var rider;

exports.show = function(req, res) {
	res.render('front',{title:"Ride Review"});
}

exports.form = function(req,res) {
	res.render('search',{title:"Ride Review"});
}

exports.submit = function(req,res){
	req.pipe(req.busboy);
	req.busboy.on('field',function(key,value){
		console.log("Key: " + key);
		console.log("Value: "+value);
		if(key=="license")
		{
			license = value;
		}
		else if(key=="name")
		{
			name = value;
		}
	});

	req.busboy.on('finish',function(){
		
		Ride.find({"vehicle.license":license},function(err,rider){
			

			if(err) throw err;

			if(rider)
			{
				console.log("Rider already present");
			}
			else
			{
				console.log("Rider not present");
			}
			

		});
});
	res.redirect('review');
}


exports.profile = function(req, res){
	res.render('reviewForm',{title:"Ride Review"});

}

exports.reviewStore = function(req, res){
	req.pipe(req.busboy);
	var email;
	var rating;
	var review;
	var condition;
	var behaviour;
	req.busboy.on('field', function(key,value){
		
		if(key=='email')
		{
			email=value;
		}else if(key=='condition')
		{
			condition=value;
		}else if(key=='behaviour')
		{
			behaviour=value;
		}else if(key=='comment')
		{
			review = value;
		}else if(key=='rating')
		{
			rating = value;
		}

	});

	req.busboy.on('finish',function(){
		console.log("Finished parsing form");
		console.log(email+" "+review+" "+condition+" "+behaviour+" "+rating);
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
				
			    
				rider.update({name:"Abhinav"});
				rider.save(function(err){
					if(err) throw err;
					console.log("Record Updated Succesfully");
					
					res.redirect('/feedback');
				});


			}
		});
		
	});
}


exports.feedback = function(req,res) {
	
	var stream = Ride.find().stream();
	
	stream.on('data', function (doc) {
  // do something with the mongoose document
  	arr.push(doc);
  	
	}).on('error', function (err) {
		throw error;
  // handle the error
	}).on('close', function () {
  // the stream is closed
  	var count = 0;
	arr.forEach(function(x){
		console.log(x["plateNum"][0] + x["person"][0]);
		count += 1;
	});
	
	res.render('feedback',{docs:arr,count:count});
	

});

}

