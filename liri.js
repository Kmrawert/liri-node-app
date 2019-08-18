require("dotenv").config();
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

// INQUIRER
inquirer.prompt([
    {
        type: "list",
        name: "pickAPI",
        message: "What type of information are you searching for?",
        choices: ["Concerts", "Songs", "Movies", "Something Else"]
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
        case 'Movies':
            moviesFunc(input);
            break;
        case 'Songs':
            spotifyFunc(input);
            break;
        // case 'concert-this':
        //     //concert Functions
        //     break;
        // case 'do-what-it-says':
        //     //Something Else func
        //     break;
    }
});

// ***********************Concerts
// `concert-this`- uses bands in town API
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// *******************Spotify Songs: 

// `spotify-this-song`
// `node liri.js concert-this <artist/band name here>`

//var spotify = new Spotify(keys.spotify);

function spotifyFunc(input) {
    var artist = input;
    var spotAPI = 

    var spotify = new Spotify({
        
        dotenv.get('/', (req, res) => {
            res.send(process.env.SECRET_KEY);
        })
        id: <your spotify client id>,
        secret: <your spotify client secret>
      });
       
      spotify.search({type: 'track', query: 'All the Small Things'}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data); 
      });
    

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

// //????
// `do-what-it-says`
