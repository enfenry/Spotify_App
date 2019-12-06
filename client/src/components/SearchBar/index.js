import React from 'react';
import './SearchBar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Autocomplete from 'react-google-autocomplete';
import { navigate } from 'hookrouter';
import axios from 'axios';


export default function SearchBar({
    path,
    setPath,
    results,
    setResults,
    query,
    setQuery,
    keys,
    accessToken }) {

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

    // USE 
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
                .then(jsonData => {
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
        const ticketURL = `http://app.ticketmaster.com/discovery/v2/events.json?latlong=${latLng.lat},${latLng.lng}&radius=25&unit=miles&size=15&classificationName=music&sort=date,asc&apikey=${keys.ticketmaster}`;

        return fetch(ticketURL)
            .then(response => response.json())
            .then(jsonData => {
                // console.log('realResults', jsonData._embedded.events);
                return jsonData._embedded.events;
            })
            // TEMPORARY FIX FOR RESULTS THAT DON'T HAVE AN ATTRACTION PROPERTY
            .then(results => { return results.filter(result => { return result._embedded.attractions }) })
    }

    const mapSpotify = async (results) => {
        const newResults = await results.map(async (result) => {
            return searchSpotify(result)
        });

        return Promise.all(newResults)
            .then(values => {
                return values;
            });
    }

    const searchSpotify = async (result) => {
        const spotifyURL = `https://api.spotify.com/v1/search?q=${result._embedded.attractions[0].name}&type=artist&market=from_token&limit=10&offset=0&include_external=audio`

        return axios.get(spotifyURL, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(jsonData => {
                let artist = jsonData.data.artists.items[0];
                if (artist) {
                    result.spotify_id = artist.id;
                    result.name = artist.name;
                    result.genres = artist.genres;
                    result.images = artist.images;
                }
                else {
                    console.log('no spotify result for ', jsonData);
                }
                return result;
            })
    }

    // HANDLE SEARCH BY LOCATION
    const handleSearch = async (event) => {
        event.preventDefault();
        setPath("/results");

        // SEARCH COORDS BASED ON STATE OF query USING GOOGLE API
        getCoords()
            .then(coords => {
                // SEARCH TICKETMASTER BASED ON COORDINATES RETURNED FROM GOOGLE SEARCH
                searchTicketmaster(coords)
                    .then(async results => {
                        // SEARCH SPOTIFY AND UPDATE WITH MORE INFORMATION FOR EACH RESULT FROM TICKETMASTER SEARCH
                        return mapSpotify(results)
                            .then(mapResults => {
                                return mapResults;
                            })
                    })
                    .then(newResults => {
                        console.log('newResults', newResults)
                        setResults(newResults);
                        navigate("/results");
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })

    }

    return (
        <div className="SearchBar">
            <Container>
                <Row>
                    <Col xs="12">
                        <Form id="form-location">
                            <Form.Group controlId="input-location">

                                {renderLabel(path)}

                                <Form.Row>
                                    <Col>
                                        <Autocomplete onPlaceSelected={(place) => setQuery(place)}
                                            types={['geocode']} placeholder="Enter location" type="location"
                                            id="input-location" className="form-control form-control-default"
                                            onChange={(event) => setQuery(event.target.value)} />
                                    </Col>
                                    <Col sm="auto">
                                        <Button id="btn-location" variant="primary" type="submit" className="btn-default"
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
