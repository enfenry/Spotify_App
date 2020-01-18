import axios from 'axios';

export const mapSpotify = async (results, accessToken) => {
    const newResults = await results.map(async (result) => {
        return searchSpotify(result, accessToken);
    });

    return Promise.all(newResults)
        .then(values => {
            return values;
        });
}

const searchSpotify = async (result, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/search?q=${result._embedded.attractions[0].name}&type=artist&market=from_token&limit=10&offset=0&include_external=audio`
    return axios.get(spotifyURL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(jsonData => {
            let artist = jsonData.data.artists.items[0];
            if (artist) {
                result.spotify_id = artist.id;
                result.name = artist.name;
                result.genres = artist.genres;
                result.images = artist.images;
            }
            else {
                console.log('no spotify result for ', jsonData);
            }
            return result;
        })
        .catch(error => {
            console.log('accessToken', accessToken);
            console.log(error);
        });
}