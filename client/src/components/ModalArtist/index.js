import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalArtist.css';

export default function ModalArtist(props) {



    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}>

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {result.artistName}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img className="result-image" src={result.src} alt={result.artistName} key={"img-" + index} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
  }