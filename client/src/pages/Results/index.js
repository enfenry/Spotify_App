import React, { useEffect } from 'react';
// import './Results.css';
import Header from '../../components/Header';
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
    setCurrentEvent,
    query,
    setQuery,
    data,
    setData,
    auth,
    setAuth,
    user,
    setUser,
    accessToken,
    setAccessToken,
    keys }) {

    useEffect(() => {
        setPath("/results");
        console.log(keys);
    })

    return (
        <div className="Results">
            <br />
            <Row className="centered">
                <Col xs="auto">
                    <Header keys={keys} auth={auth} setAuth={setAuth} user={user} setUser={setUser}
                        accessToken={accessToken} setAccessToken={setAccessToken} />
                </Col>
                <Col className="centered">
                    <SearchBar path={path} setPath={setPath} results={results} setResults={setResults}
                        query={query} setQuery={setQuery} data={data} setData={setData} keys={keys} />
                </Col>
            </Row>
            <main>
                <Row className="centered">
                    <Col xs="auto" className="padded">
                        <iframe title="playlist" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2Nc3B70tvx0?si=_AMfZgVbQsW4IeD6gwpB5w" width="300" height="540" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                    </Col>
                    <Col>
                        <ResultsBox results={results} setResults={setResults} modalShow={modalShow} setModalShow={setModalShow}
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
