import axios from 'axios';

export const mapArtists = async (results, accessToken) => {
    const newResults = await results.map(async (result) => {
        return getArtist(result, accessToken);
    });

    return Promise.all(newResults)
        .then(values => {
            return values;
        });
}

const getArtist = async (result, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/search?q=${result.name}&type=artist&market=from_token&limit=10&offset=0&include_external=audio`
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
                result.images.unshift(...artist.images);
            }
            // console.log('result',result);
            return result;
        })
        .catch(error => {
            console.log('accessToken may be expired', accessToken);
            console.log(error);
        });
}

export const findOrCreatePlaylist = async (user, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/users/${user.data.id}/playlists`;
    return axios.get(spotifyURL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(playlists => {
            console.log('playlists', playlists);
            const match = playlists.data.items.filter((playlist) => {
                return playlist.name === 'ThisWeekend' && playlist.owner.id === user.data.id
            });
            if (!match.length) {
                return axios.post(spotifyURL,
                    {
                        "name": "ThisWeekend",
                        "description": "Playlist created using ThisWeekend app. Listen to artists playing in your area."
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(newPlaylist => {
                        console.log('newPlaylist', newPlaylist);
                    })
                    .catch(error => {
                        console.log('accessToken may be expired', accessToken);
                        console.log(error);
                    })
            }
        })
        .catch(error => {
            console.log('accessToken may be expired', accessToken);
            console.log(error);
        });
}