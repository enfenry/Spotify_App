import React, { useEffect } from 'react';
import axios from 'axios';
import Login from './Login.js';
import Logout from './Logout.js';

export default function Spotify({
    auth,
    setAuth,
    user,
    setUser,
    setAccessToken,
    popoverPlacement
}) {

    // USING SPOTIFY'S IMPLICIT GRANT FLOW AUTHENTICATION METHOD
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

        // console.log('access_token', access_token)
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
                    // console.log(response);

                    setAuth(true);
                    localStorage.setItem('auth', true);
                    setUser(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    setAccessToken(access_token);
                    localStorage.setItem('access_token', access_token);
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }, [auth])

    const renderLogin = () => {
        // console.log('user', user);
        // console.log('localStorage.getItem("user")', localStorage.getItem('user'));
        // console.log('accessToken',accessToken);
        // console.log("localStorage.getItem('access_token')", localStorage.getItem('access_token'));

        return !(localStorage.getItem('user')) ? <Login stateKey={stateKey} /> : <Logout user={user} setUser={setUser} popoverPlacement={popoverPlacement} />;
    };

    return (
            renderLogin()
    )
}