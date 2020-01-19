import React, { useReducer, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalArtist from './ModalArtist.js';
import { ModalContext, ResultsContext } from '../App';
import styled from 'styled-components';
import { displayResult } from './displayResult';

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

export default function ResultsBox() {

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
    const [modalState, dispatchModal] = useReducer(reducer, initialState);

    const { resultsState } = useContext(ResultsContext);
    const results = resultsState.results;

    const handleModal = (result) => {
        dispatchModal({ type: 'SET_RESULT', result: result, visible: true });
    }

    const renderResults = (results) => {

        var mapResults = [];
        mapResults = results.map((result, index) => {
            const display = displayResult(result);

                return (
                    <Col className="padded" key={index} sm="auto">
                        <StyledImgContainer>
                            <StyledImg src={display.src}
                                alt={display.name} key={"img-" + display.name} data-toggle="modal"
                                data-target="#modal-artist" />
                            <StyledMask className="mask" onClick={() => handleModal(result)}>
                                <Row>
                                    <Col>{display.name}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>{display.genre}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{display.venue}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{display.location}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{display.date}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{display.time}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{display.prices}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </StyledMask>
                        </StyledImgContainer>
                    </Col>
                )
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
            <ModalContext.Provider value={{ modalState, dispatchModal }}>
                <ModalArtist id="modal-artist" />
            </ModalContext.Provider>
        </>
    )
};