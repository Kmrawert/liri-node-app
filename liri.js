require("dotenv").config();
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
moment().format();

// INQUIRER
inquirer.prompt([
    {
        type: "list",
        name: "pickAPI",
        message: "What type of information are you searching for?",
        choices: ["Concerts", "Music", "Movies", "Something Else"]
    },
    {
        type: "input",
        name: "searchCriteria",
        message: "What title or subject are you searching for?"
    }
]).then(function (user) {
    console.log(user.pickAPI);
    var command = user.pickAPI;
    var input = user.searchCriteria;
    switch (command) {
        case 'Concerts':
            concertFunc(input);
            break;
        case 'Music':
            spotifyFunc(input);
            break;    
        case 'Movies':
            moviesFunc(input);
            break;
        
        
        // case 'do-what-it-says':
        //     //Something Else func
        //     break;
    }
});

// ***********************Concerts
// `node liri.js concert-this <artist/band name here>`
// `concert-this`- uses bands in town API
function concertFunc(input) {
 
    var concert = input; 
    var concertURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp"
        // console.log(concertURL);

    axios.get(concertURL).then(
        function(concertResponse) {
        var concData = concertResponse.data[0]; 
        // console.log(concData);
        console.log(`Artist Lineup: ${concData.lineup}
        Venue: ${concData.venue.name} 
        Venue City: ${concData.venue.city}
        Venue Country: ${concData.venue.country}
        Event Date: ${concData.datetime}
        `)
// Need to use Momemnt to format date at MM/DD/YYYY, need to split data string and convert to format. 
// Allow for multiple events to show in results. Potentially need map function to loop through all results. 
// Does not allow for/errors given for 2 words as var concert and undefined data. 
     }) 
        .catch(function (error) {
            console.log ("ERROR RECEIVED")
            console.log(error)
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


// *******************Spotify Songs: 
// `spotify-this-song`

function spotifyFunc(input) {
    // var spotify = new Spotify(keys.spotify);
      spotify.search({type: 'track', query: input, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var spAns = data.tracks.items[0];
        // console.log(spAns);

        console.log(`    Song Title: ${spAns.name}
    Artists: ${spAns.artists.map(artist => artist.name)}
    Album: ${spAns.album.name}
    Song Preview Link: ${spAns.preview_url}`); 
      });  
// Need to provide a default setting: If no song is provided, then default to "The Sign" by Ace of Base. 
}

//******************* */ //OMDB
function moviesFunc(input) {
    var movie = input;
    var movieApi = "trilogy"
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + movieApi
    axios.get(queryUrl)
        .then(
            function (response) {
                var ans = response.data;
                console.log(`Movie Title: ${ans.Title}
    Release Year: ${ans.Year}
    IMDB Rating: ${ans.imdbRating}
    Rotten Tomatoes Rating: ${ans.Ratings[1].Value}
    Country Produced: ${ans.Country}
    Language: ${ans.Language}
    Plot: ${ans.Plot}
    Actors: ${ans.Actors}`);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

// `do-what-it-says`
// I would us FS to read the file data from the random.txt file. 
// I would then parse the information based on the beginning verbiage Spotify-this-song from the song in "", and store in a variable.
// I would set the beggining verbiage Spotify-this-song to equal Music from Inquirer, and follow the SpotifyFunc()
// I would then set the latter verbiage in "" equal to input to pass into the SpotifyFunc()

// I would then repeat the process for two other functions. 
