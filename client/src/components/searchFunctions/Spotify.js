import axios from 'axios';

export const mapArtists = async (results, accessToken) => {
    const newResults = await results.map(async (result) => {
        const artist = await findArtist(result.name, accessToken);
        if (artist) {
            result.spotify_id = artist.id;
            result.name = artist.name;
            result.genres = artist.genres;
            result.images.unshift(...artist.images);
            const tracks = await getTopTracks(artist.id, accessToken);
            const trackIds = tracks.map(track => { return track.id });
            result.trackIds = trackIds;
        }
        return result;
    });

    return await Promise.all(newResults)
        .then(values => {
            return values;
        });
}

const findArtist = async (name, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/search?q=${name}&type=artist&market=from_token&limit=10&offset=0&include_external=audio`
    return axios.get(spotifyURL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(jsonData => {
            return jsonData.data.artists.items[0];
        })
        .catch(error => {
            console.log('accessToken may be expired', accessToken);
            console.log(error);
        });
}

export const findOrCreatePlaylist = async (userId, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
    return axios.get(spotifyURL, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then( playlists => {
            const match = playlists.data.items.find((playlist) => {
                return playlist.name === 'ThisWeekend' && playlist.owner.id === userId
            });
            if (match) {
                return match;
            }
            else {
                return axios({
                    method: 'post',
                    url: spotifyURL,
                    data: {
                        "name": "ThisWeekend",
                        "description": "Playlist created using ThisWeekend app. Listen to artists playing in your area."
                    },
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    }
                })
                    .then( newPlaylist => {
                        return newPlaylist;
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

export const getTopTracks = (artistId, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`;
    return axios({
        method: 'get',
        url: spotifyURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(result => {
            return result.data.tracks;
        })
        .catch(error => {
            console.log('accessToken may be expired', accessToken);
            console.log(error);
        });
}

export const getPlaylistURIs = (results, tracksPerResult) => {
    const trackList = [];
    const filteredResults = results.filter(result => { return result.trackIds })
    filteredResults.map(result => {
        const filteredTrackIds = result.trackIds.filter((trackId, index) => { return index < tracksPerResult });
        const uris = filteredTrackIds.map(trackId => { return `spotify:track:${trackId}` });
        trackList.push(...uris);
    })
    return trackList;
}

export const replacePlaylist = (playlistId, uris, accessToken) => {
    const spotifyURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    return axios({
        method: 'put',
        url: spotifyURL,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        data: {
            "uris": uris
        }
    })
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log('accessToken may be expired', accessToken);
            console.log(error);
        });
}
