import React, { useEffect } from 'react';
import './ResultsBox.css';
// import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function ResultsBox({ results, setResults }) {

    useEffect(() => {
        setResults(results);
    })

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result,index) => {
            return (
                <Col key={index} sm="3">
                    <img className="resImg" src={result.src} alt={result.artistName} key={"img-" + index} />
                </Col>
            )
        })
        return mapResults;
    }

    return (
        <>
            {renderResults(results)}
        </>
    )
};