import React from 'react';
import './Footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {

    return (
        <div className="footer">
            <Container>
                <Row className="spaced">
                    <Col xs="6">
                        <Row className="centered">
                            <Col xs="12" lg="3">
                                <small>Made by:</small>
                            </Col>
                            <Col xs="6" lg="2">
                                <a href="https://github.com/ansarkhan" target="_blank" rel="noopener noreferrer">Ansar</a>
                            </Col>
                            <Col xs="6" lg="2">
                                <a href="https://enfenry.github.io/" target="_blank" rel="noopener noreferrer">Nolan</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6">
                        <Row className="centered">
                            <Col xs="12" lg="3">
                                <small>Powered by:</small>
                            </Col>
                            <Col xs="6" lg="2">
                                <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">
                                    <img id="spotify-logo-footer" alt="Spotify" src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_green.svg'} />
                                </a>
                            </Col>
                            <Col xs="6" lg="2">
                                <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer">
                                    <img id="ticketmaster-logo-footer" alt="Ticketmaster" src={process.env.PUBLIC_URL + '/static/img/ticketmaster_logo_white.svg'} />
                                </a>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

