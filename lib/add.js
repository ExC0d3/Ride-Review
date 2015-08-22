exports.clean = function(Model)
{
	var sum = 0;
	var stream = Model.find().stream();

	var arr = [];

	stream.on('data',function(doc){
		val = true;
		for(var x=0;x<arr.length;x++){
			if(arr[x]==doc)
			{
				val = false;
				arr[x]["person"][0]["Rating"] += doc["person"][0]["Rating"];
				break;
			}

		}

		if(val==true)
		{
			arr.push(doc);
		}
	}).on('error',function(err){
		throw err;
	}).on('close',function(){



	});

	return arr;

}