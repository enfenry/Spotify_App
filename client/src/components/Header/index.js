import React from 'react';
import './Header.css'
import Button from 'react-bootstrap/Button'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

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
            <a href="/" onClick={()=>setPath("/")}><h1><span className="emphasis">This</span>Weekend</h1></a>
            {renderLogin(path)}
        </header>
    )
}