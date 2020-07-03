import React, { useEffect, useContext } from 'react';
import { TokenContext, UserContext } from '../../App';
import axios from 'axios';
import Login from './Login.js';
import Logout from './Logout.js';

export default function Spotify({
    popoverPlacement
}) {

    const { dispatchToken } = useContext(TokenContext);
    const { userState, dispatchUser } = useContext(UserContext);
    const user = userState.user;

    // USING SPOTIFY'S IMPLICIT GRANT FLOW AUTHENTICATION METHOD
    var stateKey = 'spotify_auth_state';

    useEffect(() => {
        // console.log('user', user);
        function getHashParams() {
            var hashParams = {};
            var e, r = /([^&;=]+)=?([^&;]*)/g,
                q = window.location.hash.substring(1);
            e = r.exec(q)
            while (e) {
               hashParams[e[1]] = decodeURIComponent(e[2]);
               e = r.exec(q);
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

        if (access_token && (state == null || state !== storedState) && !(user.data)) {
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
                    dispatchUser({ type: 'SET_USER', user: response });
                    localStorage.setItem('user', JSON.stringify(response));
                    dispatchToken({ type: 'SET_TOKEN', accessToken: access_token });
                    localStorage.setItem('access_token', access_token);
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }, [])

    const renderLogin = () => {
        // console.log('user', user);
        // console.log('localStorage.getItem("user")', localStorage.getItem('user'));
        // console.log('accessToken',accessToken);
        // console.log("localStorage.getItem('access_token')", localStorage.getItem('access_token'));

        return !(localStorage.getItem('user')) ? <Login stateKey={stateKey} /> : <Logout popoverPlacement={popoverPlacement} />;
    };

    return (
            renderLogin()
    )
}