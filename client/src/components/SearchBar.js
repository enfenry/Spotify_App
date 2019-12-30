import React, { useRef, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Autocomplete from 'react-google-autocomplete';
import { navigate } from 'hookrouter';
import axios from 'axios';
import { ThemeContext } from '../themes/themes';
import styled from 'styled-components';

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 0px !important;
`

var StyledAutocomplete = styled(Autocomplete)`
    &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.theme.colorPrimary0} !important;
    }
`

const StyledFormRow = styled(Form.Row)`
    align-items: center !important;
    justify-content: center !important;
`

const StyledSearchBar = styled.div`
    width:100%;
`

export default function SearchBar({
    path,
    setPath,
    results,
    setResults,
    query,
    setQuery,
    keys,
    accessToken }) {

    const theme = useContext(ThemeContext);

    StyledAutocomplete.defaultProps = {
        theme: theme
      }

    // GRABBING REFERENCE OBJECT SO THAT WE CAN CALL handleFocus FUNCTION FOR THE AUTOCOMPLETE COMPONENT
    const inputEl = useRef(null);
    const handleFocus = () => {
        inputEl.current.refs.input.focus();
    };

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
                            <small>Try entering your city and state.</small>
                        </Form.Text>
                    </Col>
                </Form.Row>
            )
        }
    };

    // SEARCH COORDS BASED ON STATE OF query USING GOOGLE API
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
        <StyledSearchBar>
            <Container>
                <Row>
                    <Col xs="12">
                        <Form id="form-location">
                            <StyledFormGroup controlId="input-location">

                                {renderLabel(path)}

                                <StyledFormRow>
                                    <Col>
                                        <StyledAutocomplete ref={inputEl} onPlaceSelected={(place) => setQuery(place)}
                                            types={['geocode']} placeholder="Enter location" type="location"
                                            id="input-location" className="form-control form-control-default"
                                            onChange={(event) => setQuery(event.target.value)}
                                            onMouseEnter={handleFocus} />
                                    </Col>
                                    <Col sm="auto">
                                        <Button id="btn-location" variant="primary" type="submit" className="btn-default"
                                            onClick={(event) => handleSearch(event)}>
                                            Search
                                        </Button>
                                    </Col>
                                </StyledFormRow>

                                {renderHelperText(path)}

                            </StyledFormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </StyledSearchBar>
    );
}
