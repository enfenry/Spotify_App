import React from 'react';
import './ModalArtist.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';


export default function ModalArtist({
    modalShow,
    setModalShow,
    currentEvent
}) {

    // console.log(currentEvent);
    const renderName = (currentEvent) => {
        if (currentEvent._embedded) {
            return currentEvent._embedded.attractions[0].name;
        }
    }

    const renderImage = (currentEvent) => {
        if (currentEvent._embedded) {
            return (
                <img className="modal-image" src={currentEvent._embedded.attractions[0].images[0].url}
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
            if (venue.name.length < 20) {
                return (
                    <span>{venue.name}</span>
                )
            }
            return (
                <span>{`${venue.name.substring(0, 19)}...`}</span>
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
        <Modal
            className="modal-artist"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => { setModalShow(false) }}>

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {renderName(currentEvent)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col>
                                    <div className="modal-image-container">

                                        {renderImage(currentEvent)}
                                        <div className="mask">
                                            <iframe id="iframe-modal" title="topTracks" src={"https://open.spotify.com/embed/artist/7mnBLXK823vNxN3UWB7Gfz?si=OSj2G-oRQXaLYwukBQA-LA"} width="300" height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                                        </div>
                                    </div>
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
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-default" onClick={() => { setModalShow(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}