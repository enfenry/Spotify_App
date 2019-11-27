import React, { useEffect } from 'react';
import './Results.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ResultsBox from '../../components/ResultsBox';
import Spotify from '../../components/Spotify';
import Container from 'react-bootstrap/Container';
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
    setCurrentEvent,
    query,
    setQuery,
    auth,
    setAuth,
    user,
    setUser,
    setAccessToken,
    keys }) {

    useEffect(() => {
        localStorage.setItem("path", "/results")
        setPath("/results");
    })

    return (
        <div className="Results ">
            <Container fluid>
                <Row className="navBar">
                    <br />
                    <Col xs={{ span: 10, order: 1 }} md={{ span: "auto", order: 1 }} className="col-header">
                        <Header />
                    </Col>

                    <Col xs={{ span: 12, order: 2 }} md={{ span: 7, order: 2 }} lg={{ span: 8, order: 2 }} xl={{ span: 9, order: 2 }}
                     className="space-between">
                        <Row noGutters={true} className="space-between">
                            <Col className="centered col-margin-v" xs={{ span: 12, order: 10 }} md={{ span: 2, order: 12 }}>
                                <Spotify keys={keys} path={path} auth={auth} setAuth={setAuth} user={user} setUser={setUser}
                                    setAccessToken={setAccessToken} popoverPlacement='bottom' />
                            </Col>
                            <Col className="centered col-margin-v" xs={{ span: 12, order: 12 }} md={{ span: 10, order: 10 }}>
                                <SearchBar path={path} setPath={setPath} setResults={setResults}
                                    query={query} setQuery={setQuery} keys={keys} />
                            </Col>

                        </Row>
                    </Col>


                </Row>
            </Container>
            <main className="padding-top-1">
                <Row className="">
                    <Col xs="12" md="auto" className="padded">
                        <iframe title="playlist" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2Nc3B70tvx0?si=_AMfZgVbQsW4IeD6gwpB5w" width="300" height="540" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                    </Col>
                    <Col>
                        <ResultsBox results={results} modalShow={modalShow} setModalShow={setModalShow}
                            currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
                    </Col>
                </Row>
            </main>
            <Row className="padded">
            </Row>
        </div>
    );
}

export default Results;
