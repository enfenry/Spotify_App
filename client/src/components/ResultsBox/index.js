// import React, { useEffect } from 'react';
import React from 'react';
import './ResultsBox.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalArtist from '../ModalArtist';
import moment from 'moment';

export default function ResultsBox({
    results,
    modalShow,
    setModalShow,
    currentEvent,
    setCurrentEvent }) {

    const handleModal = (result) => {
        setCurrentEvent(result);
        setModalShow(true);
    }

    const renderLocation = (result) => {
        let venue = result._embedded.venues[0];
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

    const renderVenue = (result) => {
        const venue = result._embedded.venues[0];
        if (venue.name) {
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

    const renderDate = (result) => {
        let format = "YYYY-MM-DD";
        let convertedDate = moment(result.dates.start.localDate, format);
        return convertedDate.format("MMM Do, YYYY")
    }

    const renderTime = (result) => {
        let time = result.dates.start.localTime;
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

    const renderPrices = (result) => {
        if (result.priceRanges) {
            const pricing = result.priceRanges[0];

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

    const renderGenre = (result) => {
        if (result.classifications) {
            let genre = result.classifications[0].genre;
            if (genre) {
                return (
                    <span> Genre: {genre.name}</span>
                )
            }
        }
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            if (result._embedded.attractions) {

            // if (result.spotify_id) {
                return (
                    <Col className="padded" key={index} sm="auto">
                        <div className="image-container view-container">
                            <img className="result-image" src={result.images[0].url}
                                alt={result._embedded.attractions[0].name} key={"img-" + index} data-toggle="modal"
                                data-target="#modal-artist" />
                            <div className="mask" onClick={() => handleModal(result)}>
                                <Row>
                                    <Col>
                                        {result._embedded.attractions[0].name}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                {renderGenre(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderVenue(result)}

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderLocation(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderDate(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderTime(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderPrices(result)}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </div>
                        </div>
                    </Col>
                )
            };
            console.log(result);
            return null;
        })
        return (
            <Row>
                {mapResults}
            </Row>
        );
    }

    return (
        <>
            {renderResults(results)}

            <ModalArtist id="modal-artist" modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} />
        </>
    )
};