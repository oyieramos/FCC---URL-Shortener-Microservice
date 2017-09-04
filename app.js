//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
var port = 3000;

//create an instance of express for our app and instantiate bodyParser and cors
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); 
app.use(cors());

//export the collection
const shortUrl = require('./models/shortUrl');

//connect to database/mongoose; process.env.MONGODB_URI = heroku database location
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/shortUrls', {
	useMongoClient: true
});
var db = mongoose.connection;

//creates the database entry /new/:url
app.get('/new/:urlToShorten(*)', function(req, res, next){
	var {urlToShorten} = req.params; //json
	//regex for url
	var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;﻿
	if(regex.test(urlToShorten)===true){
		console.log('regex is true, proper format');
		var short = Math.floor(Math.random()*10000).toString();

		var data = new shortUrl({
					original_url: urlToShorten,
					short_url: 'https://salty-quilt.glitch.me/'+short
				});

		data.save(function(err){
			if(err){
				return res.send('Error cannot save to dabase');
			}
		});

		return res.json(data);
	}
	console.log('regex is false, improper format');
	return res.json({urlToShorten: 'improper format'});
});

app.get('/:num', function(req, res, next){
	var _num = req.params.num;
	shortUrl.findOne({'short_url': 'https://salty-quilt.glitch.me/' + _num}, function(err, data){
		if (err) return res.send(err);
		var regexCheck = new RegExp("^(http|https)://", "i");
		var strToCheck = data.original_url;
		if(regexCheck.test(strToCheck)){
			res.redirect(301, data.original_url); //301 http response status code for redirection
		} else{
			res.redirect(301, 'https://' + data.original_url);
		}
	});
});

//get port process
app.listen(process.env.PORT || port, function(){
	console.log('Connected on port ' + port);
});
