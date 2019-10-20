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
                    <ResultsBox results={results} setResults={setResults} modalShow={modalShow} setModalShow={setModalShow} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
                </Row>
            </main>
            <Row className="padded">
            </Row>
            <Footer />
        </div>
    );
}

export default Results;
