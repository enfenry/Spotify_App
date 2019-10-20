import React, { useEffect } from 'react';
// import './Results.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import ResultsBox from '../../components/ResultsBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Results({
    path,
    setPath,
    results,
    setResults,
    modalShow,
    setModalShow,
    currentEvent,
    setCurrentEvent }) {

    useEffect(() => {
        setPath("/results");
    })

    return (
        <div className="Results">
            <br />
            <Row className="centered">
                <Col xs="auto">
                    <Header />
                </Col>
                <Col className="centered">
                    <SearchBar path={path} setPath={setPath} results={results} setResults={setResults} />
                </Col>
            </Row>
            <main>
                <Row className="centered">
                    <Col xs="auto" className="padded">
                        <iframe src="https://open.spotify.com/embed/album/0aA9rYw8PEv9G7tVIJ9dKg?si=0CkfQ3A3RMOrt4vjMdvq7g" width="300" height="540" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </Col>
                    <Col>
                        <ResultsBox results={results} setResults={setResults} modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
                    </Col>
                </Row>
            </main>
            <Row className="padded">
            </Row>
            <Footer />
        </div>
    );
}

export default Results;
