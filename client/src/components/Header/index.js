import React, { useEffect } from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import { A } from 'hookrouter';
import axios from 'axios';

export default function Header({ path, setPath, auth, setAuth, user,setUser, keys }) {

    var stateKey = 'spotify_auth_state';

    useEffect(() => {
        console.log('auth', auth);
        console.log('user', user);
        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
            var hashParams = {};
            var e, r = /([^&;=]+)=?([^&;]*)/g,
                q = window.location.hash.substring(1);
            while (e = r.exec(q)) {
                hashParams[e[1]] = decodeURIComponent(e[2]);
            }
            return hashParams;
        }

        var params = getHashParams();

        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

        console.log('params', params)
        console.log('access_token', access_token)
        console.log('state', state)
        console.log('storedState', storedState);

        if (access_token && (state == null || state !== storedState)) {
            alert('There was an error during the authentication');
        }
        else {
            localStorage.removeItem(stateKey);
            if (access_token) {
                axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then((response) => {
                        console.log(response);
                        setAuth(true);
                        setUser(response);
                    }, (error) => {
                        console.log(error);
                    });

                // $.ajax({
                //     url: 'https://api.spotify.com/v1/me',
                //     headers: {
                //         'Authorization': 'Bearer ' + access_token
                //     },
                //     success: function (response) {
                //         console.log(response);
                //     }
                // });
            }
            else {
            }

        }
    })




    const handleLogin = async (event) => {
        event.preventDefault();
        // TODO: SET REDIRECT URI TO BE DYNAMIC
        var client_id = keys.spotify.id; // Your client id
        var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri   
        // THE BELOW DOESN'T WORK
        // var redirect_uri = '%PUBLIC_URL%/callback'; // Your redirect uri

        /**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
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


    const renderLogin = (path) => {
        if (path === "/") {
            return (
                <>
                    <small>Log in to </small> <Button variant="success" id="btn-spotify-login"
                        className="btn-spotify" onClick={(event) => handleLogin(event)}>
                        <img id="spotify-logo-header" alt="Spotify-Login"
                            src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} />
                    </Button>
                </>
            );
        }
    };

    return (
        <header>
            <A href="/"><h1><span className="emphasis">This</span>Weekend</h1></A>
            {renderLogin(path)}
        </header>
    )
}