import React from 'react';
import './Header.css'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import logo from '../../../public/spotify_logo_with_text.svg'

function Header() {

    return (
        <header>
            <h1>This<span className="emphasis">Weekend</span></h1>
            <small>Log in to </small><Button variant="success" className="spotify-login"><img id="spotify-logo-header" alt="Spotify-Login" src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_black.svg'} /></Button>
        </header>
    )
}

export default Header;