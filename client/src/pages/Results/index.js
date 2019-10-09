import React from 'react';
// import './Results.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Row from 'react-bootstrap/Row';

function Results() {
    return (
        <div className="Results">
            <Row>
                <Header />
                <SearchBar />
            </Row>

            <Footer />
        </div>
    );
}

export default Results;
