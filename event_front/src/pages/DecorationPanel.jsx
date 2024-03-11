import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const DecorationPanel = () => {
  const [decorations, setDecorations] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [decorationName, setDecorationName] = useState('');
  const [decorationType, setDecorationType] = useState('');
  const [decorationAvailable, setDecorationAvailable] = useState(true);
  const [decorationArea, setDecorationArea] = useState('');
  const [decorationPrice, setDecorationPrice] = useState(0);
  const [decorationWishlisted, setDecorationWishlisted] = useState(false);
  
  useEffect(() => {
    fetchDecorations();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchDecorations = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/decorations');
      setDecorations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (decoration) => {
    setSelectedDecoration(decoration);
    setShowModal(true);
    setDecorationName(decoration.name);
    setDecorationType(decoration.type);
    setDecorationAvailable(decoration.available);
    setDecorationArea(decoration.area);
    setDecorationPrice(decoration.price);
    setDecorationWishlisted(decoration.wishlisted);
  };

  const handleSave = async () => {
    try {
      if (selectedDecoration) {
        const updatedDecoration = {
          id: selectedDecoration.id,
          name: decorationName,
          type: decorationType,
          available: decorationAvailable,
          area: decorationArea,
          price: decorationPrice,
          wishlisted: decorationWishlisted,
        };
        await axios.put(`http://localhost:8181/api/decorations/${selectedDecoration.id}`, updatedDecoration);
      } else {
        const newDecoration = {
          name: decorationName,
          type: decorationType,
          available: decorationAvailable,
          area: decorationArea,
          price: decorationPrice,
          wishlisted: decorationWishlisted,
        };
        await axios.post('http://localhost:8181/api/decorations', newDecoration);
      }
      handleClose();
      fetchDecorations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (decorationId) => {
    try {
      await axios.delete(`http://localhost:8181/api/decorations/${decorationId}`);
      fetchDecorations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setDecorationName('');
    setDecorationType('');
    setDecorationAvailable(true);
    setDecorationArea('');
    setDecorationPrice(0);
    setDecorationWishlisted(false);
    setSelectedDecoration(null);
  };

  return (
    <Container>
      <h1>Decoration Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Available</th>
            <th>Area</th>
            <th>Price</th>
            <th>Wishlisted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {decorations.map((decoration) => (
            <tr key={decoration.id}>
              <td>{decoration.id}</td>
              <td>{decoration.name}</td>
              <td>{decoration.type}</td>
              <td>{decoration.available ? 'Yes' : 'No'}</td>
              <td>{decoration.area}</td>
              <td>{decoration.price}</td>
              <td>{decoration.wishlisted ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(decoration)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(decoration.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Decoration
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDecoration ? 'Edit Decoration' : 'Add Decoration'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDecorationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter decoration name"
                value={decorationName}
                onChange={(e) => setDecorationName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDecorationType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter decoration type"
                value={decorationType}
                onChange={(e) => setDecorationType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDecorationAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={decorationAvailable}
                onChange={(e) => setDecorationAvailable(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="formDecorationArea">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter decoration area"
                value={decorationArea}
                onChange={(e) => setDecorationArea(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDecorationPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter decoration price"
                value={decorationPrice}
                onChange={(e) => setDecorationPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDecorationWishlisted">
              <Form.Check
                type="checkbox"
                label="Wishlisted"
                checked={decorationWishlisted}
                onChange={(e) => setDecorationWishlisted(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DecorationPanel;
