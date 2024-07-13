import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal({ addItem, show, onHide }) {
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
if (title.trim() && dueDate.trim()) {
  const newItem = {
    createdAt: new Date().toISOString(),
    title: title.trim(),
    notes: notes.trim(),
    dueDate: dueDate.trim(),
  };
  addItem(newItem);
  onHide();
}
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      data-testid="modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add To-Do List Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="dueDateTime">
            <Form.Label>Due Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Item"
              data-testid="item-title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              data-testid="item-notes-textarea"
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            data-testid="submit-button"
            onClick={(e) => handleClick(e)}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button data-testid="close-button" onClick={() => onHide()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default MyVerticallyCenteredModal;
