import React from 'react';
import './LoginSpotify.css';
import Button from 'react-bootstrap/Button';

export default function LoginSpotify({
    keys,
    stateKey
}) {

    const handleLogin = (event) => {
        event.preventDefault();
        // TODO: SET REDIRECT URI TO BE DYNAMIC
        var client_id = keys.spotify.id; // Your client id
        var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri   
        // THE BELOW DOESN'T WORK
        // var redirect_uri = '%PUBLIC_URL%/callback'; // Your redirect uri

        function generateRandomString(length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        var state = generateRandomString(16);

        localStorage.setItem(stateKey, state);
        var scope = 'user-read-private user-read-email';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    };

    return (
        <>
            <small>Log in to </small><Button variant="success" id="btn-spotify-login"
                className="btn-spotify" onClick={(event) => handleLogin(event)}>
                <img className="img-header" id="spotify-logo-header" alt="Spotify-Login"
                    src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} />
            </Button>
        </>
    );
};