import React from 'react';
import './ModalArtist.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export default function ModalArtist({
    modalShow,
    setModalShow,
    currentArtist
}) {

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => { setModalShow(false) }}>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {currentArtist.artistName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="modal-image" src={currentArtist.src} alt={currentArtist.artistName} key={"img-current"} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { setModalShow(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}