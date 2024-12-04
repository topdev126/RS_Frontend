import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
  return (
    <Modal
      show={show}
      backdrop="static"  // Prevents closing the modal by clicking outside
      keyboard={false}   // Prevents closing the modal by pressing Esc key
      centered
      animation={true}
    >
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Button className="btn btn-primary" type="button" disabled>
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
