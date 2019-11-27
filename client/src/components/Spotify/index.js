import React, { useEffect } from 'react';
import './Spotify.css';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';

export default function Spotify({
    path,
    auth,
    setAuth,
    user,
    setUser,
    setAccessToken,
    popoverPlacement,
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
                    setAccessToken(access_token);
                    localStorage.setItem('access_token', access_token);
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }, [auth])

    const renderLogin = () => {

        if (!(localStorage.getItem('user'))) {
            return (
                <Login path={path} keys={keys} stateKey={stateKey} />
            );
        }
        else {
            return (
                <Logout path={path} user={user} setUser={setUser} popoverPlacement ={popoverPlacement} />
            )
        }

    };

    return (
        <>
            {renderLogin()}
        </>
    )
}