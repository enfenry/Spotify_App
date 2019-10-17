import React from 'react';
import './ModalArtist.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ModalArtist({
    modalShow,
    setModalShow,
    currentEvent
}) {

    return (
        <Modal
            className="modal-artist"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => { setModalShow(false) }}>

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {currentEvent.artistName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {/* <Col md="6"> */}
                        <Col>
                            <div className="modal-image-container view view-first">
                                <img className="modal-image" src={currentEvent.src} alt={currentEvent.artistName} key={"img-current"} />
                                <div className="mask">
                                    {currentEvent.price}
                                    <h2>{currentEvent.day} {currentEvent.time}</h2>
                                    <p>{currentEvent.location}</p>
                                    {currentEvent.price}
                                    <a href="#" className="info">Genre: {currentEvent.genre}</a>
                                </div>
                            </div>
                        </Col>
                        {/* <Col xs="auto">
                            <Row>{currentEvent.day} {currentEvent.time}</Row>
                            <Row>{currentEvent.location}</Row>
                            <Row>{currentEvent.price}</Row>
                            <Row>Genre: {currentEvent.genre}</Row>
                        </Col> */}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-default" onClick={() => { setModalShow(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}