// Write the code you need to grab the data from keys.js. Then store the keys in a variable.//
//Make it so that liri.js can take in one of the following commands//
//my-tweets, spotify-this-song, movie-this, do-what-it-says//

var liri = require("./keys.js");
var liriKeys = liri.twitterkeys;
var spotifyKeys = liri.spotifykeys;


//Twitter----------------------------------------------------------------------------------------------------

if (process.argv[2] === "my-tweets") {
  var Twitter = require("twitter");
   
  var client = new Twitter({
    consumer_key: liriKeys.consumer_key,
    consumer_secret: liriKeys.consumer_secret,
    access_token_key: liriKeys.access_token_key,
    access_token_secret: liriKeys.access_token_secret,
  });
 

  var params = {screen_name: "cindygchen92", count: "20"};

  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
      return console.log("Error");
    }
    for (i = 0; i < 20; i++) {
      console.log("Tweet: " + tweets[i].text + "\nCreated at: " + tweets[i].created_at);
    }   
        
  });
}

  //--------------------------------------MOVIE------------------------------------------//
if (process.argv[2] === "movie-this") {

  var request = require("request");

  var movieName = "";

  for (var i = 3; i < process.argv.length; i++) {

    if (i === 3) {
      movieName += process.argv[3];
    } 
    if (i > 3 &&  i < process.argv.length) { 
      movieName += "+" + process.argv[i];
    }

}
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("URL: " + JSON.parse(body).Website);
    }
  });
}
//---------------Spotify------------------------//
function spotify() {
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify({
      id: spotifyKeys.client_id,
      secret: spotifyKeys.client_secret,
    });

     
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name );
      console.log("Preview Link: " + data.tracks.items[0].preview_url );
      console.log("Album: " + data.tracks.items[0].album.name);
    });
}
//-------------------------do what it says------------------------
if (process.argv[2] === "do-what-it-says") {
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    process.argv[3] = dataArr[1];
    spotify();

  });
}

if (process.argv[2] === "spotify-this-song") {
  spotify();
}



