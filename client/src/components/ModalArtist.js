import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeContext } from '../themes';
import { ModalContext } from '../App';
import styled from 'styled-components';

const StyledModalHeader = styled(Modal.Header)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border-bottom: 0px !important;
    border-top: 0px !important;
    color: white;
`

const StyledModalFooter = styled(Modal.Footer)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border-bottom: 0px !important;
    border-top: 0px !important;
    color: white;
`

const StyledModalBody = styled(Modal.Body)`
    text-align: center;
    background-color: rgb(32, 32, 34);
    border: 0px !important;
    color: white;
`

const StyledModal = styled(Modal)`
    color: white;
`

const StyledImg = styled.img`
    height: 100%;
    min-width: 100%;
    max-width: none;
    margin: 0 -100%;
`

const StyledImgContainer = styled.div`
    height: 300px;
    width: 300px;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;

    :hover .mask {
        bottom: 300px;
        left: 0px;
        opacity: 0.9;
    }

    :hover iframe {
        width:300px;
        height:300px;
    }
`
const StyledMask = styled.div`
    position: relative;
    bottom: 80px;
    left: 220px;
    height: 100%;
    opacity: .95;
    background-color: rgba(0, 0, 0, 1);
    transition: all .2s ease-in-out;
    result: flex;
    flex-direction: column;
    justify-content: space-between;
`

const StyledIframe = styled.iframe`
    width:80px;
    height:80px;
`

const StyledButton = styled(Button)`
    background-color: ${props => props.theme.colorPrimary0} !important;
    border-color: ${props => props.theme.colorPrimary3} !important;
    height: calc(1.5em + .75rem + 2px) !important;
    width: 100% !important;

    &:hover {
        opacity: .7;
        transition: .3s ease;
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.theme.colorPrimary1} !important;
    }
`

export default function ModalArtist() {
    const { modalState, dispatchModal } = useContext(ModalContext);
    const result = modalState.result;
    
    const theme = useContext(ThemeContext);

    StyledButton.defaultProps = {
        theme: theme
    }

    const renderOtherArtists = () => {
        if (result.otherArtists) {
            var mapOtherArtists = [];
            mapOtherArtists = result.otherArtists.map((artist) => {
                return (
                    <Row key={`artist-${artist}`}>
                        <small>{artist}</small>
                    </Row>
                )
            });

            return (
                <Col>
                    <Row>Playing with:</Row>
                    <Row>
                        <Col xs={{offset:1}}>{mapOtherArtists}</Col>
                    </Row>
                </Col>
            );
        }
    }

    return (
        <StyledModal className="modal-artist" size="lg" aria-labelledby="contained-modal-title-vcenter"
            centered show={modalState.visible} onHide={() => { dispatchModal({ type: 'SHOW_MODAL', visible: false }) }}>
            <StyledModalHeader>
                <Modal.Title id="contained-modal-title-vcenter">
                    {result.name}
                </Modal.Title>
            </StyledModalHeader>
            <StyledModalBody>
                <Container>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col>
                                    <StyledImgContainer className="modal-image-container">
                                        <StyledImg className="modal-image" src={result.src}
                                            alt={result.name} key={"img-current"} />
                                        <StyledMask className="mask">
                                            <StyledIframe id="iframe-modal" title="topTracks" src={`https://open.spotify.com/embed/artist/${result.spotify_id}?si=OSj2G-oRQXaLYwukBQA-LA`} frameBorder="0" allowtransparency="true" allow="encrypted-media" />
                                        </StyledMask>
                                    </StyledImgContainer>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
                            <Row></Row>
                            <Row>{result.genre}</Row>
                            <Row>{result.date}</Row>
                            <Row>{result.time}</Row>
                            <Row>{result.venue}</Row>
                            <Row>{result.location}</Row>
                            <Row>{result.prices}</Row>
                            <Row>{renderOtherArtists()}</Row>
                        </Col>
                    </Row>
                </Container>
            </StyledModalBody>
            <StyledModalFooter>
                <StyledButton className="btn-default" onClick={() => { dispatchModal({ type: 'SHOW_MODAL', visible: false }) }}>Close</StyledButton>
            </StyledModalFooter>
        </StyledModal>
    );
}