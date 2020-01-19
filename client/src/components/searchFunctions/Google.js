import { keys } from '../../keys';

// SEARCH COORDS BASED ON STATE OF query USING GOOGLE API
export const getCoords = async (query) => {
    let coords = {};
    let location;

    // TODO: AUTO-FILL SEARCH BAR WITH USER'S CURRENT LOCATION
    // PLAYING AROUND WITH GEOLOCATION
    // let geoCoords = {};
    // let geolocation;
    // PLAYING AROUND WITH GEOLOCATION

    if (query.geometry) {
        location = query.geometry.location
        coords = {
            lat: location.lat(),
            lng: location.lng()
        }
    }
    else {
        let geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${keys.google}`;
        await fetch(geoURL)
            .then(response => response.json())
            .then(jsonData => {
                location = jsonData.results[0].geometry.location
                coords = {
                    lat: location.lat,
                    lng: location.lng
                };
                // console.log('coords',coords);
            })
            .catch((error) => {
                console.error(error)
            })

        // TODO: AUTO-FILL SEARCH BAR WITH USER'S CURRENT LOCATION
        // PLAYING AROUND WITH GEOLOCATION
        // let locateURL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${keys.google}`;
        // return axios.post(locateURL, {})
        //     .then(jsonData => {
        //         geolocation = jsonData.data.location;
        //         geoCoords = {
        //             lat: location.lat,
        //             lng: location.lng
        //         };
        //         console.log('geoCoords',geoCoords);
        //     })
        // PLAYING AROUND WITH GEOLOCATION
    }
    return coords;
}