import React from 'react';
import './SearchBar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Autocomplete from 'react-google-autocomplete';

export default function SearchBar({
    path,
    setPath,
    results,
    setResults,
    query,
    setQuery,
    data,
    setData,
    keys }) {

    const renderLabel = (path) => {
        if (path === "/") {
            return (
                <Form.Row>
                    <Col>
                        <Form.Label>Search for concerts in your area</Form.Label>
                    </Col>
                </Form.Row>
            );
        }
    };

    const renderHelperText = (path) => {
        if (path === "/") {
            return (
                <Form.Row>
                    <Col>
                        <Form.Text className="text-muted">
                            <small>You can search by city, state, or zip.</small>
                        </Form.Text>
                    </Col>
                </Form.Row>
            )
        }
    };

    const getCoords = async () => {
        let coords = {};
        let location;

        if (query.geometry) {
            location = query.geometry.location
            coords = {
                lat: location.lat(),
                lng: location.lng()
            }
        }
        else {
            let geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${keys.google}`;
            await fetch(geoURL)
                .then(response => response.json())
                .then((jsonData) => {
                    location = jsonData.results[0].geometry.location
                    coords = {
                        lat: location.lat,
                        lng: location.lng
                    };
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        return coords;
    }

    const searchTicketmaster = async (latLng) => {
        let resultsURL = process.env.PUBLIC_URL + 'exampleResults.json';

        fetch(resultsURL)
            .then(response => response.json())
            .then((jsonData) => {
                // console.log('exampleResults',jsonData)
                // setResults(jsonData);
            })
            .catch((error) => {
                console.error(error)
            })

        let ticketURL = `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${latLng.lat},${latLng.lng}&radius=25&unit=miles&size=15&classificationName=music&sort=date,asc&apikey=${keys.ticketmaster}`;
            console.log(ticketURL);
        fetch(ticketURL)
        .then(response => response.json())
        .then((jsonData) => {
            // console.log('realResults',jsonData._embedded.events);
            setResults(jsonData._embedded.events);
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        setPath("/results");
        let coords;

        getCoords()
            .then((response) => {
                coords = response

                searchTicketmaster(coords)
            })


    }


    return (
        <div className="SearchBar">
            <Container>
                <Row>
                    <Col xs="12">
                        <Form>
                            <Form.Group controlId="formLocation">

                                {renderLabel(path)}

                                <Form.Row>
                                    <Col>
                                        <Autocomplete onPlaceSelected={(place) => setQuery(place)}
                                            types={['geocode']} placeholder="Enter location" type="location"
                                            id="formLocation" className="form-control form-control-default"
                                            onChange={(event) => setQuery(event.target.value)} />
                                    </Col>
                                    <Col sm="auto">
                                        <Button variant="primary" type="submit" className="btn-default"
                                            onClick={(event) => handleSearch(event)}>
                                            Search
                                        </Button>
                                    </Col>
                                </Form.Row>

                                {renderHelperText(path)}

                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
