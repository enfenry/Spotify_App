import React, { useRef, useContext, useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Autocomplete from 'react-google-autocomplete';
import { navigate } from 'hookrouter';

import { getCoords } from './searchFunctions/Google';
import { searchTicketmaster } from './searchFunctions/Ticketmaster';
import { mapArtists, findOrCreatePlaylist, replacePlaylist, getPlaylistURIs } from './searchFunctions/Spotify';
import { ResultsContext, PlaylistContext, PathContext, TokenContext, UserContext } from '../App';
import { ThemeContext } from '../themes';
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

const StyledButton = styled(Button)`
    background-color: ${props => props.theme.colorPrimary0} !important;
    border-color: ${props => props.theme.colorPrimary3} !important;

    &:hover {
        opacity: .7;
        transition: .3s ease;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.theme.colorPrimary1} !important;
    }
`

export default function SearchBar() {

    function reducer(state, action) {
        switch (action.type) {
            case 'UPDATE_QUERY':
                return { ...state, query: action.query }
            default:
                return state;
        }
    }

    const initialSearch = { type: 'UPDATE_QUERY', query: '' };
    const [searchState, dispatchSearch] = useReducer(reducer, initialSearch);
    const query = searchState.query;

    const { dispatchResults } = useContext(ResultsContext);
    const { dispatchPlaylist } = useContext(PlaylistContext);

    const { pathState, dispatchPath } = useContext(PathContext);
    const path = pathState.path;

    const { tokenState } = useContext(TokenContext);
    const accessToken = tokenState.accessToken;

    const { userState } = useContext(UserContext);
    const user = userState.user;

    const theme = useContext(ThemeContext);

    StyledAutocomplete.defaultProps = {
        theme: theme
    }

    StyledButton.defaultProps = {
        theme: theme
    }

    // GRABBING REFERENCE OBJECT SO THAT WE CAN CALL handleFocus FUNCTION FOR THE AUTOCOMPLETE COMPONENT
    const inputEl = useRef(null);
    const handleFocus = () => {
        inputEl.current.refs.input.focus();
    };

    const renderLabel = (path) => {
        return path === "/" ?
            <Form.Row>
                <Col><Form.Label>Search for concerts in your area</Form.Label></Col>
            </Form.Row>
            : <></>;
    }

    const renderHelperText = (path) => {
        return path === "/" ?
            <Form.Row>
                <Col>
                    <Form.Text className="text-muted">
                        <small>Try entering your city and state.</small>
                    </Form.Text>
                </Col>
            </Form.Row>
            : <></>;
    };

    // HANDLE SEARCH BY LOCATION
    const handleSearch = async (event) => {
        event.preventDefault();
        // SEARCH COORDS BASED ON STATE OF query USING GOOGLE API
        getCoords(query)
            .then(coords => {
                // SEARCH TICKETMASTER BASED ON COORDINATES RETURNED FROM GOOGLE SEARCH
                searchTicketmaster(coords)
                    .then(async results => {
                        // SEARCH SPOTIFY AND UPDATE WITH MORE INFORMATION FOR EACH RESULT FROM TICKETMASTER SEARCH
                        return mapArtists(results, accessToken)
                            .then(mapResults => {
                                return mapResults;
                            })
                    })
                    .then(newResults => {
                        findOrCreatePlaylist(user.data.id, accessToken)
                            .then(newPlaylist => {
                                const uris = getPlaylistURIs(newResults, 2);
                                replacePlaylist(newPlaylist.id, uris, accessToken);
                                dispatchPath({ type: 'SET_PATH', path: '/results' });
                                dispatchPlaylist({ type: 'SET_PLAYLIST', playlist: newPlaylist });
                                dispatchResults({ type: 'SET_RESULTS', results: newResults });
                                navigate("/results");
                            })
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
                                        <StyledAutocomplete ref={inputEl} onPlaceSelected={(place) => dispatchSearch({ type: 'UPDATE_QUERY', query: place })}
                                            types={['geocode']} placeholder="Enter location" type="location"
                                            id="input-location" className="form-control form-control-default"
                                            onChange={(event) => dispatchSearch({ type: 'UPDATE_QUERY', query: event.target.value })}
                                            onMouseEnter={handleFocus} />
                                    </Col>
                                    <Col sm="auto">
                                        <StyledButton id="btn-location" variant="primary" type="submit"
                                            onClick={(event) => handleSearch(event)}>
                                            Search
                                        </StyledButton>
                                    </Col>
                                </StyledFormRow>
                                {renderHelperText(path)}
                            </StyledFormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </StyledSearchBar>
    )
}