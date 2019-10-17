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
    currentArtist
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
                    {currentArtist.artistName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md="6">
                            <div className="modal-image-container">
                                <img className="modal-image" src={currentArtist.src} alt={currentArtist.artistName} key={"img-current"} />
                            </div>
                        </Col>
                        <Col xs="auto">
                            Info will go here!
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-default" onClick={() => { setModalShow(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}