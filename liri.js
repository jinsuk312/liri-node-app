// DATA CENTRAL
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require("request");
var keys = require('./key.js')
var fs = require('fs')

//PROCESS.ARGV
var pArgv = process.argv;
var order = process.argv[2];
// MULTIPLE USER INPUT VIA PROCESS.ARGV
var uI = "";
for(var i = 3; i < pArgv.length; i++){
	if(i > 3 && i < pArgv.length){
		uI = uI + "+" + pArgv;
	}else{
		uI = uI + pArgv[i];
	}
}

//IM SORRY SCOTT I HAD TO PULL A MARK STYLE HERE
switch(order){
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		if(uI){
			spotifyThisSong(uI);
		}else{
			spotifyThisSong("The Sign")
		}
		break;
	case "move-this":
		moveiThis();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	default:
		console.log("OPTIONS[my-tweets/spotify-this-song/do-what-it-says]");
		break;
}

function myTweets(){
	var screenName = {screen_name: 'jinsukmik'};
	client.get('statuses/user_timeline', screenName, function(error, tweets, response){
		if(error){
			console.log(error);
			for(var i = 0; i < tweets.length; i++){
				var create = tweets[i].created_at;
				console.log("Tweets: [" + tweets[i].text + "] Created At: " + date.substring(0, 19))
				fs.appendFile('log.txt', "Tweets: [" + tweets[i].text + "] Created At: " + date.substring(0, 19))
			}else{
				console.log("CODE-SMELL!!");
			}
		}
	})
}

function spotifyThisSong(song){
	spotify.search({ type: 'track', query: keyword || "enough", limit: 1 }, function(error, data) {
		if (error) {
			return console.log('Error occurred: ' + err);
		}
		for(var i = 0; i < data.tracks.items.length; i++){
			var pie = data.tracks.item[0];
			console.log('----Song INFO----');
			console.log('Artist: ' + pie.artists[0].name);
			console.log('Song Name: ' + pie.name);
			console.log('Preview Link: ' + pie.preview_url);
			console.log('Album: ' + pie.album.name);
			console.log('----END OF LINE----')

			fs.appendFile('log.txt', pie.artists[0].name);
			fs.appendFile('log.txt', pie.name);
			fs.appendFile('log.txt', pie.preview_url);
			fs.appendFile('log.txt', pie.album.name);
			fs.appendFile('log.txt', "-----------------");
		}else{
			console.log("CODE-SMELL!!");
		}
	});
};

function movieThis(movie){
	var URL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true"
	request(URL, function(error, response, body){
		if(error && response.statusCode == 200){
			var body = JSON.parse(body);
			console.log("----MOVIE----")
			console.log("Title of the movie: " + body.Title)
			console.log("Year the movie ame out: " + body.Year)
			console.log("IMDB Rating: " + body.imdbRating)
			console.log("Country produced: " + body.Country)
			console.log("Language of movie: " + body.Language)
			console.log("Plot of movie: " + body.Plot)
			console.log("Actors in movie: " + body.Actors);
			console.log("-------------")

			fs.appendFile('log.txt', body.Title);
			fs.appendFile('log.txt', body.Year);
			fs.appendFile('log.txt', body.imdbRating);
			fs.appendFile('log.txt', body.Country);
			fs.appendFile('log.txt', body.Language);
			fs.appendFile('log.txt', body.Plot);
			fs.appendFile('log.txt', body.Actors);
		}else (movie = "Mr. Nobody"){
			console.log(body.Title)
			console.log(body.Year)
			console.log(body.imdbRating)
			console.log(body.Country)
			console.log(body.Language)
			console.log(body.Plot)
			console.log(body.Actors)
			console.log("--------------")

			fs.appendFile('log.txt', body.Title);
			fs.appendFile('log.txt', body.Year);
			fs.appendFile('log.txt', body.imdbRating);
			fs.appendFile('log.txt', body.Country);
			fs.appendFile('log.txt', body.Language);
			fs.appendFile('log.txt', body.Plot);
			fs.appendFile('log.txt', body.Actors);
		};
	});
};

function doWhatItSays(){
	fs.readFile('random.txt', "utf8", function(error, data){
		var text = data.split(",");
		spotifyThisSong(text[1]);
	})
}