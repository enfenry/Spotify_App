import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { ThemeContext } from '../themes';
import { ModalContext } from '../App';
import styled from 'styled-components';

const StyledModalHeader = styled(Modal.Header)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border-bottom: 0px !important;
    border-top: 0px !important;
    color: white;
`

const StyledModalFooter = styled(Modal.Footer)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border-bottom: 0px !important;
    border-top: 0px !important;
    color: white;
`

const StyledModalBody = styled(Modal.Body)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border: 0px !important;
    color: white;
`

const StyledModal = styled(Modal)`
    color: white;
`

const StyledImg = styled.img`
    height: 100%;
    min-width: 100%;
    max-width: none;
    margin: 0 -100%;
`

const StyledImgContainer = styled.div`
    height: 300px;
    width: 300px;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;

    :hover .mask {
        bottom: 300px;
        left: 0px;
        opacity: 0.9;
    }

    :hover iframe {
        width:300px;
        height:300px;
    }
`
const StyledMask = styled.div`
    position: relative;
    bottom: 80px;
    left: 220px;
    height: 100%;
    opacity: .95;
    background-color: rgba(0, 0, 0, 1);
    transition: all .2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const StyledIframe = styled.iframe`
    width:80px;
    height:80px;
`

const StyledButton = styled(Button)`
    background-color: ${props => props.theme.colorPrimary0} !important;
    border-color: ${props => props.theme.colorPrimary3} !important;
    height: calc(1.5em + .75rem + 2px) !important;
    width: 100% !important;

    &:hover {
        opacity: .7;
        transition: .3s ease;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.theme.colorPrimary1} !important;
    }
`

export default function ModalArtist() {
    const { modalState, dispatchModal } = useContext(ModalContext);
    const result = modalState.result;

    const theme = useContext(ThemeContext);

    StyledButton.defaultProps = {
        theme: theme
    }

    let display = {
        name: ``,
        src: ``,
        location: ``,
        venue: ``,
        date: ``,
        time: ``,
        prices: ``,
        genre: ``,
        otherArtists: ``
    };

    if (result._embedded) {
        // check name to display
        display.name = result._embedded.attractions[0].name;
        // check src to display
        display.src = result.images.length ? result.images[0].url : result._embedded.attractions[0].images[0].url;
        // check location to display
        let venue = result._embedded.venues[0];
        if (venue.state) {
            display.location = `${venue.city.name}, ${venue.state.stateCode}`;
        }
        else if (venue.city) {
            display.location = `${venue.city.name}, ${venue.country.countryCode}`;
        }
        // check venue to display
        display.venue = venue.name.length < 38 ? venue.name : `${venue.name.substring(0, 37)}...`;
    }
    if (result.dates) {
        // check date to display
        let convertedDate = moment(result.dates.start.localDate, "YYYY-MM-DD");
        display.date = convertedDate.format("MMM Do, YYYY");
        //  check time to display
        let time = result.dates.start.localTime;
        if (time) {
            let hour = parseInt(time.substring(0, 2));
            let minute = time.substring(2, time.length - 3);
            let tail;
            if (hour < 12) {
                tail = 'AM';
            }
            else {
                if (hour > 12) {
                    hour -= 12;
                }
                tail = 'PM';
            }
            if (minute === ":00") {
                display.time = hour + tail;
            }
            display.time = hour + minute + tail;
        }
    }
    if (result.priceRanges) {
        // check prices to display
        const pricing = result.priceRanges[0];
        display.prices = pricing.max === pricing.min ? `${pricing.min} ${pricing.currency}` : `${pricing.min} - ${pricing.max} ${pricing.currency}`;
    }
    if (result.classifications) {
        // check genre to display
        let genre = result.classifications[0].genre;
        if (genre) {
            display.genre = `Genre: ${genre.name}`;
        }
    }
    if (result.otherArtists) {
        display.otherArtists = renderOtherArtists(result);
    }

    const renderOtherArtists = (result) => {
        var mapOtherArtists = [];
        mapOtherArtists = result.otherArtists.map((artist, index) => {
            return (
                <Row key={`artist-${index}`}>
                    {artist}
                </Row>
            )
        });

        return (
            <Col>
                <Row>Playing with:</Row>
                <Row>
                    <Col>{mapOtherArtists}</Col>
                </Row>
            </Col>
        );
    }

    return (
        <StyledModal className="modal-artist" size="lg" aria-labelledby="contained-modal-title-vcenter"
            centered show={modalState.visible} onHide={() => {dispatchModal({ type: 'SHOW_MODAL', visible: false })}}>
            <StyledModalHeader>
                <Modal.Title id="contained-modal-title-vcenter">
                    {display.name}
                </Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                <Container>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col>
                                    <StyledImgContainer className="modal-image-container">
                                        <StyledImg className="modal-image" src={display.src}
                                            alt={display.name} key={"img-current"} />
                                        <StyledMask className="mask">
                                            <StyledIframe id="iframe-modal" title="topTracks" src={`https://open.spotify.com/embed/artist/${result.spotify_id}?si=OSj2G-oRQXaLYwukBQA-LA`} frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                                        </StyledMask>
                                    </StyledImgContainer>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
                            <Row><p className="text-left"><small>{result.bio}</small></p></Row>
                            <Row></Row>
                            <Row>{display.genre}</Row>
                            <Row>{display.date}</Row>
                            <Row>{display.time}</Row>
                            <Row>{display.venue}</Row>
                            <Row>{display.location}</Row>
                            <Row>{display.prices}</Row>
                            <Row>{display.otherArtists}</Row>
                        </Col>
                    </Row>
                </Container>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledButton className="btn-default" onClick={() => {dispatchModal({ type: 'SHOW_MODAL', visible: false })}}>Close</StyledButton>
            </StyledModalFooter>
        </StyledModal>
    );
}