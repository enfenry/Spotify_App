import React, { useEffect } from 'react';
import './ResultsBox.css';
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ResultsBox({
    results,
    setResults,
    modalShow,
    setModalShow,
    currentArtist,
    setCurrentArtist }) {

    useEffect(() => {
        setCurrentArtist(currentArtist)
        setResults(results);
    })

    const handleModal = (artist) => {
        setModalShow(true);
        setCurrentArtist(artist);
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            return (
                <Col key={index} sm="auto">
                    {result.artistName}
                    <div className="image-container">
                        <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} onClick={() => handleModal(result)} />
                    </div>
                </Col>
            )
        })
        return mapResults;
    }

    return (
        <>
            {renderResults(results)}

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {currentArtist.artistName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="modal-image" src={currentArtist.src} alt={currentArtist.artistName} key={"img-current"} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};