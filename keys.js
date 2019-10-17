console.log("Keys loaded");

module.exports = {
    google : process.env.GOOGLE_KEY,
    spotify: {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    },
    ticketmaster: process.env.TICKETMASTER_KEY
};
