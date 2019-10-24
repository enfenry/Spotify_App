console.log("Keys loaded");

module.exports = {
    keys: {
        google: process.env.REACT_APP_GOOGLE_KEY,
        spotify: {
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        },
        ticketmaster: process.env.TICKETMASTER_KEY
    }
};
