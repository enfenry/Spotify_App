// import React, { useEffect } from 'react';
import React from 'react';
import './ResultsBox.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModalArtist from '../ModalArtist'

export default function ResultsBox({
    results,
    setResults,
    modalShow,
    setModalShow,
    currentEvent,
    setCurrentEvent }) {

    // useEffect(() => {
    //     setResults(results);
    // })

    const handleModal = (artist) => {
        setCurrentEvent(artist);
        setModalShow(true);
    }

    const renderGenre = (result) => {
        let genre = result.classifications[0].genre;
        if (genre) {
            return (
                <span> Genre: {genre.name}</span>
            )
        }
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            // console.log(result.classifications[0].genre.name);
            console.log(result._embedded.attractions[0].images[0].url);
            console.log(result._embedded.attractions[0]);
            return (
                <Col className="padded" key={index} sm="auto">
                    <div className="image-container view-container">
                        {/* <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} data-toggle="modal" data-target="#modal-artist" /> */}
                        <img className="result-image" src={result._embedded.attractions[0].images[0].url} alt={result._embedded.attractions[0].name} key={"img-" + index} data-toggle="modal" data-target="#modal-artist" />
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
                                            <span>{result.day} {result.time}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span>{result.location}</span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <span>{result.price}</span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            {renderGenre(result)}
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