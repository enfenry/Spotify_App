import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { ThemeContext } from '../themes';
import { MyContext } from '../App';
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

export default function ModalArtist({
    currentEvent
}) {
    const {modalState, dispatch} = useContext(MyContext);
    const theme = useContext(ThemeContext);

    StyledButton.defaultProps = {
        theme: theme
    }

    const renderName = (currentEvent) => {
        if (currentEvent._embedded) {
            return currentEvent._embedded.attractions[0].name;
        }
    }

    const renderImage = (currentEvent) => {
        if (currentEvent.spotify_id) {
            return (
                <StyledImg className="modal-image" src={currentEvent.images[0].url}
                    alt={renderName(currentEvent)} key={"img-current"} />
            )
        }
        else if (currentEvent._embedded) {
            return (
                <StyledImg className="modal-image" src={currentEvent._embedded.attractions[0].images[0].url}
                    alt={renderName(currentEvent)} key={"img-current"} />
            )
        }
    }

    const renderLocation = (currentEvent) => {
        if (currentEvent._embedded) {
            let venue = currentEvent._embedded.venues[0];
            if (venue.state) {

                return (
                    <span>{venue.city.name}, {venue.state.stateCode}</span>
                )
            }
            else if (venue.city) {
                return (
                    <span>{venue.city.name}, {venue.country.countryCode}</span>
                )
            }
            else {
                return (
                    <span></span>
                )
            }
        }
    }

    const renderVenue = (currentEvent) => {
        if (currentEvent._embedded) {
            const venue = currentEvent._embedded.venues[0]
            if (venue.name.length < 40) {
                return (
                    <span>{venue.name}</span>
                )
            }
            return (
                <span>{`${venue.name.substring(0, 39)}...`}</span>
            )
        }
    }

    const renderDate = (currentEvent) => {
        if (currentEvent.dates) {
            let format = "YYYY-MM-DD";
            let convertedDate = moment(currentEvent.dates.start.localDate, format);
            return convertedDate.format("MMM Do, YYYY");
        }
    }

    const renderTime = (currentEvent) => {
        if (currentEvent.dates) {
            let time = currentEvent.dates.start.localTime;
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
                    return hour + tail;
                }
                return hour + minute + tail;
            }
            else {
                console.log("result couldn't render time", currentEvent)
            }
        }
    }

    const renderPrices = (currentEvent) => {
        if (currentEvent.priceRanges) {
            const pricing = currentEvent.priceRanges[0];

            if (pricing.max === pricing.min) {
                return (
                    <span>{pricing.min} {pricing.currency}</span>
                )
            }
            else {
                return (
                    <span>{pricing.min} - {pricing.max} {pricing.currency}</span>
                )
            }
        }
    }

    const renderGenre = (currentEvent) => {
        if (currentEvent.classifications) {
            let genre = currentEvent.classifications[0].genre;
            if (genre) {
                return (
                    <span> Genre: {genre.name}</span>
                )
            }
        }
    }

    const renderOtherArtists = (currentEvent) => {
        if (currentEvent.otherArtists) {
            var mapOtherArtists = [];
            mapOtherArtists = currentEvent.otherArtists.map((artist, index) => {
                return (
                    <Row key={`artist-${index}`}>
                        {artist}
                    </Row>
                )
            });

            return (
                <Col>
                    <Row>
                        Playing with:
                        </Row>
                    <Row>
                        <Col>
                            {mapOtherArtists}
                        </Col>
                    </Row>
                </Col>

            );
        }
    }

    return (
        <StyledModal
            className="modal-artist"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalState.modalShow}
            onHide={() => { 
                dispatch({ modalShow: false }) 
                }}>

            <StyledModalHeader>
                <Modal.Title id="contained-modal-title-vcenter">
                    {renderName(currentEvent)}
                </Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                <Container>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col>
                                    <StyledImgContainer className="modal-image-container">

                                        {renderImage(currentEvent)}
                                        <StyledMask className="mask">
                                            <StyledIframe id="iframe-modal" title="topTracks" src={`https://open.spotify.com/embed/artist/${currentEvent.spotify_id}?si=OSj2G-oRQXaLYwukBQA-LA`} frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                                        </StyledMask>
                                    </StyledImgContainer>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
                            <Row><p className="text-left"><small>{currentEvent.bio}</small></p></Row>
                            <Row></Row>
                            <Row>{renderGenre(currentEvent)}</Row>
                            <Row>{renderDate(currentEvent)}</Row>
                            <Row>{renderTime(currentEvent)}</Row>
                            <Row>{renderVenue(currentEvent)}</Row>
                            <Row>{renderLocation(currentEvent)}</Row>
                            <Row>{renderPrices(currentEvent)}</Row>
                            <Row>{renderOtherArtists(currentEvent)}</Row>
                        </Col>
                    </Row>
                </Container>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledButton className="btn-default" onClick={() => { 
                    dispatch({ modalShow: false }) 
                    }}>Close</StyledButton>
            </StyledModalFooter>
        </StyledModal>
    );
}