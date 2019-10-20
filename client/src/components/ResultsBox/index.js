import React, { useEffect } from 'react';
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

    useEffect(() => {
        setResults(results);
    })

    const handleModal = (artist) => {
        setCurrentEvent(artist);
        setModalShow(true);
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            return (
                <Col className="padded" key={index} sm="auto">
                    <div className="image-container view-container">
                        <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} data-toggle="modal" data-target="#modal-artist" />

                        <div className="mask" onClick={() => handleModal(result)}>
                            <Row>
                                <Col>
                                    {result.artistName}
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
                                            <span> Genre: {result.genre}</span>
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
        return mapResults;
    }

    return (
        <>
            {renderResults(results)}

            <ModalArtist id="modal-artist" modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} />
        </>
    )
};