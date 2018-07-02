require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var request = require("request");

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userEntry = process.argv[2];

var userTerm = process.argv.slice(3).join("%20");

var mytweets = function () {
    // show last 20 tweets and when was created.

    var params = {
        screen_name: "marviesolis",
        count: 20,
        result_type: "recent",
        lang: "en"
    }

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) throw error;

        console.log("============= LAST 20 TWEETS =============\n\n");
        for (var i = 0; i < tweets.length; i++) {
            console.log('\n');
            console.log([i + 1] + ") " + tweets[i].text);
            console.log("    Date created: " + tweets[i].created_at + "\n");
            fs.appendFile("log.txt", ([i + 1] + ") " + tweets[i].text + "\nDate created: " + tweets[1].created_at + "\n\n\n"), function (err) {
                if (err) throw err;
            });
        }
    });
}

function spotifyThisSong(userTerm) {
    if (process.argv[3] === null) {
        spotify.search({ type: 'track', query: "the sign", limit: 5 }, function (error, data) {
            if (error) {
                throw error;
            }
            else if (!error) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("========== SPOTIFY SONG SEARCH RESULT ==========");
                    console.log("Artist: " + songData.artists[0].name);
                    console.log("Song: " + songData.name);
                    console.log("Preview URL: " + songData.preview_url);
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");

                    //adds text to log.txt
                    fs.appendFile('log.txt', "======== SPOTIFY SEARCH =======", function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.artists[0].name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.preview_url, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.album.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', "-----------------------", function (err) {
                        if (err) throw err;
                    });
                }
            } else {
                console.log('Error occurred.');
            }
        });
    }
    else {
        spotify.search({ type: 'track', query: userTerm, limit: 5 }, function (error, data) {
            if (error) {
                throw error;
            }
            else if (!error) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("========== SPOTIFY SONG SEARCH RESULT ==========");
                    console.log("Artist: " + songData.artists[0].name);
                    console.log("Song: " + songData.name);
                    console.log("Preview URL: " + songData.preview_url);
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");

                    //adds text to log.txt
                    fs.appendFile('log.txt', "======== SPOTIFY SEARCH =======", function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.artists[0].name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.preview_url, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.album.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', "-----------------------", function (err) {
                        if (err) throw err;
                    });
                }
            } else {
                console.log('Error occurred.');
            }
        });
    }
}

var movieThis = function () {

    var omdbURL = 'http://www.omdbapi.com/?t=' + userTerm + '&plot=short&tomatoes=true&apikey=trilogy';

    if (!userTerm) {
        omdbURL = 'http://www.omdbapi.com/?t=mr+nobody&plot=short&tomatoes=true&apikey=trilogy';
    }

    request(omdbURL, function (error, response, body) {
        if (error) {
            throw error;
        }
        else {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);



            fs.appendFile('log.txt', "========== OMDB RESULTS ==========", function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Title: " + body.Title, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Release Year: " + body.Year, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Country: " + body.Country, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Language: " + body.Language, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Plot: " + body.Plot, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Actors: " + body.Actors, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "======================================", function (err) {
                if (err) throw err;
            });
        };

    });
}



var doWhatItSays = function () {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            var dataArr = data.split(",");
            if (dataArr[0] === "spotify-this-song") {
                var songData = dataArr[1].slice(1, -1);
                spotifyThisSong(songData);
            }
        }
    }

)}


if (userEntry === "my-tweets") {
    mytweets();
}
else if (userEntry === "spotify-this-song") {
    if (userTerm === null) {
        userTerm = "the sign";
    }
    spotifyThisSong(userTerm);
}
else if (userEntry === "movie-this") {
    movieThis(userTerm);
}
else if (userEntry === "do-what-it-says") {
    doWhatItSays();
};