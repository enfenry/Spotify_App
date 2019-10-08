import React from 'react';
import './Footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {

    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col>
                        <small>Made by: Ansar & Nolan</small>
                    </Col>
                    <Col>
                        <small>Powered by: Spotify</small>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;

