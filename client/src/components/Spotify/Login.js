import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { keys } from '../../keys';
import { PathContext } from '../../App';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    ${props => props.small ?
        `height: 50px; 
        width: auto;
        ` : ""}
    background-color: #1ED760 !important;
    border-color: #00D14E !important;
    color: black !important;
    
    &:hover {
        opacity: .7;
        transition: .3s ease;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem #009C3A !important;
    }
`

export default function Login({ stateKey }) {

    const { pathState } = useContext(PathContext);
    const path = pathState.path;

    const handleLogin = (event) => {
        event.preventDefault();
        var client_id = keys.spotify.id; // Your client id
        var redirect_uri = `${window.location.origin}/callback`; // Your redirect uri   

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

    const renderButton = (isSmall, src) => {
        return (
            <StyledButton small={isSmall} onClick={(event) => handleLogin(event)}>
                <img className="img-header" id="spotify-logo-header" alt="Spotify-Login"
                    src={src} />
            </StyledButton>
        )
    }

    const renderLogin = () => {
        return path === '/' ?
            <><small>Log in to </small>{renderButton('false', process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg')}</>
            : renderButton('true', process.env.PUBLIC_URL + '/static/img/spotify_logo_no_text_black.svg');
    }

    return (
            renderLogin()
    );
};