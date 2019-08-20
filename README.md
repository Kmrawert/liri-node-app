# liri-node-app
LIRI stands for a Language Interpretation and Recognition Interface. This application uses the command line node application to interpret user input/information, and return data/results. 

LIRI returns useful data in 2 related areas: Music and Movies. The information is provided by 3 APIs, with multiple NPM packages. The APIs used in this application are: 
    Spotify: https://www.npmjs.com/package/node-spotify-api 
        The Spotify API provides data for the Music choice, when selected. 
    OMDB: http://www.omdbapi.com
        The OMDB API provides data for the Movies choice, when selected.
    BandsInTown: http://www.artists.bandsintown.com/bandsintown-api
        The BandsInTown API provides data for the Concerts choice, when selected. 

The NPM Packages required for this application can be found in the JSON Package and listed below. To install all required modules, please type "NPM install" into node in your terminal. 
    AXIOS: https://www.npmjs.com/package/axios   
    MOMENT: https://www.npmjs.com/package/moment
    DOTENV: https://www.npmjs.com/package/dotenv
    INQUIRER: https://www.npmjs.com/package/inquirer

This application allows the user to find 3 types of data: 
Concert - upcoming concerts by a specific artist
    Displayed Information - Artist Lineup, venue name, venue city and country, event date
Music - song information by a specific artist or song name/title
    Displayed Information - Song name, Artists, Album name, Song Preview Link 
Movies - movie information by a specific movie title
    Displayed Information - Movie Title, Release Year, IMDB Rating, Rotten Tomatoes Rating, Country Produced, Language, Plot, Actors

Inquirer was used to allow the user to select which type of information they need information from (effectively chosing the API to pull the informaiton from). Inquirer was used to provide the following options to the user: 
Concerts, Music, Movies, Something Else

Inquirer asks the user to use their arrow keys on their key board to select (enter) a choice above. The user is then prompted for input - 
    Concerts - must be 1 word band/artist name to search by currently.
    Music - Can search by either artist/band name, or by the song title. 
    Movies - Must search by movie name/title. 

Once user provides input, inquierer then uses a Switch Statement to handle the different functions per API. 
This application is organized by 3 different functions for each API - 
    Concerts - concertFunc()
    Music - spotifyFunc()
    Movies - moviesFunc()
    The swich statement is similar to a conditional statment, and takes in the users parameters from Inquirer and "switches" to the corresponding case. For additional information on Switch Statements: https://www.w3schools.com/js/js_switch.asp. 
    
    From Inquirer to switch statement, the first case is Concerts which calls the concertFunc Function. 
    This function is responsible for returning the concert per band/artist information. 
    First, it takes the user's input and stores it within a variable to add to the URL to the API. The API URL can be customized with the user input to complete a query. 
    The URL is then passed into the AXIOS module which performs an AJAX request from the API to perform a query/request for information. The function(response), captures the data that is then parsed using dot notation. 
    The .catch function of AXIOS is used to display/console error messages, should the AJAX call not be completed properly and can be used for debugging. 
    
    
    From Inquirer to switch statement, the second case is Music which calls the spotifyFunc Function. 
    This function is responsible for returning the song information per band/artist information. 
    First, it takes the user's input and stores it within a variable to add to the URL to the API. 
    The URL is then passed into the AXIOS module which performs an AJAX request from the API to perform a query/request for information. The function(response), captures the data that is then parsed using dot notation. 
    The .map function allows for looping through nested arrays to get valuable information. 
    The .catch function of AXIOS is used to display/console error messages, should the AJAX call not be completed properly and can be used for debugging. 
    
    
    From Inquirer to switch statement, the third case is Movies which calls the moviesFunc Function. 
    This function is responsible for returning the movies information per movie title information. 
    First, it takes the user's input and stores it within a variable to add to the URL to the API. 
    The URL is then passed into the AXIOS module which performs an AJAX request from the API to perform a query/request for information. The function(response), captures the data that is then parsed using dot notation. 
    The .catch function of AXIOS is used to display/console error messages, should the AJAX call not be completed properly and can be used for debugging. 
    
    
    
    

