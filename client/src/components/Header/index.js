import React, { useEffect } from 'react';
// import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { A, navigate, useRedirect } from 'hookrouter';
import axios from 'axios';

export default function Header({
    path,
    setPath,
    auth,
    setAuth,
    user,
    setUser,
    accessToken,
    setAccessToken,
    keys }) {

    var stateKey = 'spotify_auth_state';

    useEffect(() => {

        console.log('auth', auth);
        console.log('user', user);

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
        // console.log('params', params);

        var access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

        console.log('access_token', access_token)
        // console.log('state', state)
        // console.log('storedState', storedState);

        // console.log('state == null', state == null)
        // console.log('state !== storedState', state !== storedState);

        if (access_token && (state == null || state !== storedState) && !(auth)) {
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
                    localStorage.setItem('auth', true);
                    setUser(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    localStorage.setItem('access_token', access_token);
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }, [auth])

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

    // TODO: HANDLE THIS THE REACT OR HOOKROUTER WAY
    // THIS METHOD SUCKS
    const handleSignOut = (path) => {
        localStorage.clear();
        navigate(path);
        window.location.reload();
    }

    const renderLogin = (path) => {

        if (path === "/") {
            if (!(localStorage.getItem('user'))) {
                return (
                    <>
                        <small>Log in to </small><Button variant="success" id="btn-spotify-login"
                            className="btn-spotify" onClick={(event) => handleLogin(event)}>
                            <img className="img-header" id="spotify-logo-header" alt="Spotify-Login"
                                src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} />
                        </Button>
                    </>
                );
            }
            else {
                const popover = (
                    <Popover id="popover-basic">
                        <Popover.Title as="h3">Logged in as {user.data.display_name}</Popover.Title>
                        <Popover.Content>
                            <a onClick={() => handleSignOut(path)}>Sign Out</a>
                        </Popover.Content>
                    </Popover>
                );

                return (
                    <>
                        <OverlayTrigger rootClose trigger="click" placement="right" overlay={popover}>
                            <img className="img-header" id="user-profile-header" alt="User-Profile" type="button" src={user.data.images[0].url} />
                        </OverlayTrigger>
                    </>
                )
            }
        }
    };

    return (
        <header>
            <A href="/"><h1><span className="emphasis">This</span>Weekend</h1></A>
            {renderLogin(path)}
        </header>
    )
}