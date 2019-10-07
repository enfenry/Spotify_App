// Names: 
// SoundsNearMe
// NearHear
// HearNear
// HearBy
// HearMe
// Hearo

// PLACES API
let searchString = "Arlington"
const googleAPIKey = "AIzaSyCnsnM9b6TZ5mBxr4yaxLjHXLk8-NkscoE";
// https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters
let placesQueryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + searchString + "&key=" + googleAPIKey + "&types=geocode" ;

let placesQueryURL1 = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=22201&key=AIzaSyCnsnM9b6TZ5mBxr4yaxLjHXLk8-NkscoE&types=geocode";

let placesQueryURL2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyCnsnM9b6TZ5mBxr4yaxLjHXLk8-NkscoE";

// GEOCODING API

let geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInput + "&key=" + googleAPIKey;

let geoURL1 = "https://maps.googleapis.com/maps/api/geocode/json?address=Arlington,VA&key=AIzaSyCnsnM9b6TZ5mBxr4yaxLjHXLk8-NkscoE";

// TICKETMASTER API
const ticketmasterAPIkey = "1FADcqMEkzQiSakwUoKLPibod91GMG6g";

let ticketURL = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + coords + "&startDateTime=" + today + "T14:00:00Z&sort=date,asc&radius=" + radius + "&unit=" + unit + "&size=" + size + "&classificationName=music&apikey=" + ticketmasterAPIkey;

let ticketURL = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=-33.8670522,151.1957362&radius=50&unit=miles&size=10&classificationName=music&apikey=1FADcqMEkzQiSakwUoKLPibod91GMG6g";

// SPOTIFY API
// Client ID 5c34f514edfb4520a6d287a93f4afec7
// Client Secret 115c9550547a46fd8aa42eef97ef1960