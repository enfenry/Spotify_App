import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const StyledFooter = styled.div`
position: fixed;
bottom: 0;
left:0;
width: 100%;
height: 60px;
font-size: 70%;
background-color:black;
display:flex;
justify-content: center;
align-items: center;
`

// min-width:70px specified by spotify branding guidelines 
const StyledLogo = styled.img`
max-width: 80%;
min-width:70px;
height: 1.5rem;
`

const StyledRow = styled(Row)`
 ${props => props.spacebetween ? "justify-content: space-between" : ""};
`

const StyledLink = styled.a`
text-decoration: none;
color: var(--color-primary-0) !important;
opacity: 1;

&:hover {
    opacity: .7;
    transition: .3s ease;
    cursor: pointer;
}
`

export default function Footer() {

    return (
        <StyledFooter>
            <Container>
                <StyledRow spacebetween="true">
                    <Col xs="6">
                        <Row className="centered">
                            <Col xs="12" lg="3">
                                <small>Made by:</small>
                            </Col>
                            <Col xs="6" lg="2">
                                <StyledLink href="https://github.com/ansarkhan" target="_blank" rel="noopener noreferrer">Ansar</StyledLink>
                            </Col>
                            <Col xs="6" lg="2">
                                <StyledLink href="https://enfenry.github.io/" target="_blank" rel="noopener noreferrer">Nolan</StyledLink>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6">
                        <Row className="centered">
                            <Col xs="12" lg="3">
                                <small>Powered by:</small>
                            </Col>
                            <Col xs="6" lg="2">
                                <StyledLink href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">
                                    <StyledLogo alt="Spotify" src={process.env.PUBLIC_URL + '/static/img/spotify_logo_with_text_green.svg'} />
                                </StyledLink>
                            </Col>
                            <Col xs="6" lg="2">
                                <StyledLink href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer">
                                    <StyledLogo alt="Ticketmaster" src={process.env.PUBLIC_URL + '/static/img/ticketmaster_logo_white.svg'} />
                                </StyledLink>
                            </Col>
                        </Row>
                    </Col>
                </StyledRow>
            </Container>
        </StyledFooter>
    )
}