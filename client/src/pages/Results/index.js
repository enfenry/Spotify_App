import React, { useEffect } from 'react';
// import './Results.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Results({ path, setPath }) {

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
                    <SearchBar path={path} setPath={setPath} />
                </Col>
            </Row>

            <Footer />
        </div>
    );
}

export default Results;
