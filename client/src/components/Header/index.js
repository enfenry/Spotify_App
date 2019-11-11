import React from 'react';
import './Header.css'
import Button from 'react-bootstrap/Button'
import {A} from 'hookrouter'

export default function Header({ path, setPath }) {

    const renderLogin = (path) => {
        if (path === "/") {
            return (
                <>
                <small>Log in to </small> <Button variant="success" className="btn-spotify"><img id="spotify-logo-header" alt="Spotify-Login" src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} /></Button>
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