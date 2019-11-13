// module.exports = {
//     // mongoURI: 'mongodb://username1:password1@ds055485.mlab.com:55485/project3',
//     // origin: 'http://localhost:3000'
// }

// console.log("Keys loaded");
// const envs = require("dotenv").config().parsed;
// console.log('envs',envs);

module.exports = {
    google: process.env.REACT_APP_GOOGLE_KEY,
    spotify: {
        id: process.env.REACT_APP_SPOTIFY_ID,
        secret: process.env.REACT_APP_SPOTIFY_SECRET
    },
    ticketmaster: process.env.REACT_APP_TICKETMASTER_KEY
};