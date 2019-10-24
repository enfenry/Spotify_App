// module.exports = {
//     // mongoURI: process.env.MONGODB_URI,
//     // origin: process.env.ORIGIN,
//     // s3_key: process.env.AWS_ACCESS_KEY_ID,
//     // s3_secret: process.env.AWS_ACCESS_KEY_ID
//     // awsREGION: process.env.AWS_DEFAULT_REGION
// }

console.log("Keys loaded");

module.exports = {
    keys: {
        google: process.env.GOOGLE_KEY,
        spotify: {
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        },
        ticketmaster: process.env.TICKETMASTER_KEY
    }
};