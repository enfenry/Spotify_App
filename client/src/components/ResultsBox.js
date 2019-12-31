import React, { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalArtist from './ModalArtist.js';
import { MyContext } from '../App';
import moment from 'moment';
import styled from 'styled-components';

const StyledImg = styled.img`
    height: 100%;
    min-width: 100%;
    max-width: none;
    margin: 0 -100%;
    transition: all .2s linear;
`

const StyledImgContainer = styled.div`
    height: 12rem;
    width: 12rem;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    font-size: calc(2px + 2vmin);

    span {
        opacity: 0;
        transition: all .2s ease-in-out;
    }

    &:hover img { 
        transform: scale(1.1);
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        -webkit-filter: blur(2px);
        filter: blur(2px);
    } 
    &:hover .mask { 
        bottom: 12rem;
        opacity: 0.8;
    }
    
    &:hover span
     {
        opacity: 1;
    }
`

const StyledMask = styled.div`
    padding: 2%;
    position: relative;
    bottom: 2rem;
    height:100%;
    opacity: .9;
    background-color: rgba(0, 0, 0, 1); 
    transition: all .2s ease-in-out;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    cursor:pointer;
`

export default function ResultsBox({results}) {

    function reducer(state, action) {
        switch (action.type) {
            case 'SHOW_MODAL':
                return { ...state, visible: action.visible }
            case 'SET_RESULT':
                return { ...state, visible: action.visible, result: action.result };
            default:
                return initialState;
        }
    }

    const initialState = { type: 'SHOW_MODAL', visible: false, result: {} };
    const [modalState, dispatch] = useReducer(reducer, initialState);

    const handleModal = (result) => {
        dispatch({ type: 'SET_RESULT', result: result, visible: true });
    }

    const renderLocation = (result) => {
        let venue = result._embedded.venues[0];
        if (venue.state) {

            return (
                <span>{venue.city.name}, {venue.state.stateCode}</span>
            )
        }
        else if (venue.city) {
            return (
                <span>{venue.city.name}, {venue.country.countryCode}</span>
            )
        }
        else {
            return (
                <span></span>
            )
        }
    }

    const renderVenue = (result) => {
        const venue = result._embedded.venues[0];
        if (venue.name) {
            if (venue.name.length < 20) {
                return (
                    <span>{venue.name}</span>
                )
            }
            return (
                <span>{`${venue.name.substring(0, 19)}...`}</span>
            )
        }
    }

    const renderDate = (result) => {
        let format = "YYYY-MM-DD";
        let convertedDate = moment(result.dates.start.localDate, format);
        return convertedDate.format("MMM Do, YYYY")
    }

    const renderTime = (result) => {
        let time = result.dates.start.localTime;
        if (time) {
            let hour = parseInt(time.substring(0, 2));
            let minute = time.substring(2, time.length - 3);
            let tail;
            if (hour < 12) {
                tail = 'AM';
            }
            else {
                if (hour > 12) {
                    hour -= 12;
                }
                tail = 'PM';
            }
            if (minute === ":00") {
                return hour + tail;
            }
            return hour + minute + tail;
        }
        else {
            console.log("result couldn't render time", result)
        }
    }

    const renderPrices = (result) => {
        if (result.priceRanges) {
            const pricing = result.priceRanges[0];

            if (pricing.max === pricing.min) {
                return (
                    <span>{pricing.min} {pricing.currency}</span>
                )
            }
            else {
                return (
                    <span>{pricing.min} - {pricing.max} {pricing.currency}</span>
                )
            }
        }
    }

    const renderGenre = (result) => {
        if (result.classifications) {
            let genre = result.classifications[0].genre;
            if (genre) {
                return (
                    <span> Genre: {genre.name}</span>
                )
            }
        }
    }

    const renderResults = (results) => {
        var mapResults = [];
        mapResults = results.map((result, index) => {
            if (result._embedded.attractions) {

                // TODO: CHECK IF THERE IS A SPOTIFY ID IN RESULT AND RENDERING RESULT DIFFERENTLY
                //     var image;
                //     var name;
                //     var genres;

                // if (result.spotify_id) {
                //     genres = result.genres;
                // }
                return (
                    <Col className="padded" key={index} sm="auto">
                        <StyledImgContainer>
                            <StyledImg src={result.images[0].url}
                                alt={result._embedded.attractions[0].name} key={"img-" + result._embedded.attractions[0].name} data-toggle="modal"
                                data-target="#modal-artist" />
                            <StyledMask className="mask" onClick={() => handleModal(result)}>
                                <Row>
                                    <Col>
                                        {result._embedded.attractions[0].name}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                {renderGenre(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderVenue(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderLocation(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderDate(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderTime(result)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {renderPrices(result)}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </StyledMask>
                        </StyledImgContainer>
                    </Col>
                )
            };
            console.log(result);
            return null;
        })
        return (
            <Row>
                {mapResults}
            </Row>
        );
    }

    return (
        <>
            {renderResults(results)}
            <MyContext.Provider value={{ modalState, dispatch }}>
                <ModalArtist id="modal-artist" />
            </MyContext.Provider>
        </>
    )
};