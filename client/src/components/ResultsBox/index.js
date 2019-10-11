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
        mapResults = results.map((result, index) => {
            return (
                <Col key={index} sm="auto">
                    <div className="image-container">
                        {/* {result.artistName} */}
                        <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} />
                    </div>
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