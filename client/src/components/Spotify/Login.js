import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    ${props => props.small ? "height: 50px; width: auto;" : ""}
    background-color: var(--color-secondary-2-0) !important;
    border-color: var(--color-secondary-2-3) !important;
    color: black !important;
    
    &:hover {
        opacity: .7;
        transition: .3s ease;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem var(--color-secondary-2-4) !important;
    }
`

export default function Login({
    path,
    keys,
    stateKey
}) {

    const handleLogin = (event) => {
        event.preventDefault();
        // TODO: SET REDIRECT URI TO BE DYNAMIC
        var client_id = keys.spotify.id; // Your client id
        var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri   
        // THE BELOW DOESN'T WORK
        // var redirect_uri = process.env.PUBLIC_URL + '/callback'; // Your redirect uri

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

    const renderLoginButton = () => {
        if (path === "/") {
            return (
                <>
                    <small>Log in to </small><StyledButton
                        onClick={(event) => handleLogin(event)}>
                        <img className="img-header" id="spotify-logo-header" alt="Spotify-Login"
                            src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} />
                    </StyledButton>
                </>
            )
        }
        else {
            return (
                <>
                    <StyledButton small="true"
                         onClick={(event) => handleLogin(event)}>
                        <img className="img-header" id="spotify-logo-header" alt="Spotify-Login"
                            src={process.env.PUBLIC_URL + '/static/img/spotify_logo_no_text_black.svg'} />
                    </StyledButton>
                </>
            )
        }
    }

    return (
        <>
            {renderLoginButton()}
        </>
    );
};