import React, { useEffect } from 'react';
import './ResultsBox.css';
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ModalArtist from '../ModalArtist'

export default function ResultsBox({
    results,
    setResults,
    modalShow,
    setModalShow,
    currentArtist,
    setCurrentArtist }) {

    useEffect(() => {
        setResults(results);
    })

    const handleModal = (artist) => {
        setCurrentArtist(artist);
        setModalShow(true);
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            return (
                <Col key={index} sm="auto">
                    {result.artistName}
                    <div className="image-container">
                        <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} onClick={() => handleModal(result)} data-toggle="modal" data-target="#modal-artist" />
                    </div>
                </Col>
            )
        })
        return mapResults;
    }

    return (
        <>
            {renderResults(results)}

            <ModalArtist id="modal-artist" modalShow={modalShow} setModalShow={setModalShow} currentArtist={currentArtist} />
        </>
    )
};