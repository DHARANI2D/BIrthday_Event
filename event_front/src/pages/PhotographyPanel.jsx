import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const PhotographyPanel = () => {
  const [photographyServices, setPhotographyServices] = useState([]);
  const [selectedPhotographyService, setSelectedPhotographyService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  useEffect(() => {
    fetchPhotographyServices();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchPhotographyServices = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/photography');
      setPhotographyServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (service) => {
    setSelectedPhotographyService(service);
    setShowModal(true);
    setServiceName(service.name);
    setServiceLocation(service.location);
    setServicePrice(service.price);
    setServiceAvailable(service.available);
  };

  const handleSave = async () => {
    try {
      if (selectedPhotographyService) {
        const updatedService = {
          id: selectedPhotographyService.id,
          name: serviceName,
          location: serviceLocation,
          price: servicePrice,
          available: serviceAvailable,
        };
        await axios.put(`http://localhost:8181/api/photography/${selectedPhotographyService.id}`, updatedService);
      } else {
        const newService = {
          name: serviceName,
          location: serviceLocation,
          price: servicePrice,
          available: serviceAvailable,
        };
        await axios.post('http://localhost:8181/api/photography', newService);
      }
      handleClose();
      fetchPhotographyServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8181/api/photography/${serviceId}`);
      fetchPhotographyServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setServiceName('');
    setServiceLocation('');
    setServicePrice(0);
    setServiceAvailable(true);
    setSelectedPhotographyService(null);
  };

  return (
    <Container>
      <h1>Photography Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {photographyServices.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.location}</td>
              <td>{service.price}</td>
              <td>{service.available ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(service)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(service.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Photography Service
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPhotographyService ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formServiceName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service location"
                value={serviceLocation}
                onChange={(e) => setServiceLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServicePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter service price"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={serviceAvailable}
                onChange={(e) => setServiceAvailable(e.target.checked)}
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

export default PhotographyPanel;
