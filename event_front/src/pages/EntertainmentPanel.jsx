import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const EntertainmentPanel = () => {
  const [entertainmentServices, setEntertainmentServices] = useState([]);
  const [selectedEntertainmentService, setSelectedEntertainmentService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceDuration, setServiceDuration] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceAvailable, setServiceAvailable] = useState(true);

  useEffect(() => {
    fetchEntertainmentServices();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchEntertainmentServices = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/entertainment');
      setEntertainmentServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (service) => {
    setSelectedEntertainmentService(service);
    setShowModal(true);
    setServiceName(service.name);
    setServiceType(service.type);
    setServiceDuration(service.duration);
    setServicePrice(service.price);
    setServiceAvailable(service.available);
  };

  const handleSave = async () => {
    try {
      if (selectedEntertainmentService) {
        const updatedService = {
          id: selectedEntertainmentService.id,
          name: serviceName,
          type: serviceType,
          duration: serviceDuration,
          price: servicePrice,
          available: serviceAvailable,
        };
        await axios.put(`http://localhost:8181/api/entertainment/${selectedEntertainmentService.id}`, updatedService);
      } else {
        const newService = {
          name: serviceName,
          type: serviceType,
          duration: serviceDuration,
          price: servicePrice,
          available: serviceAvailable,
        };
        await axios.post('http://localhost:8181/api/entertainment', newService);
      }
      handleClose();
      fetchEntertainmentServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8181/api/entertainment/${serviceId}`);
      fetchEntertainmentServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setServiceName('');
    setServiceType('');
    setServiceDuration(0);
    setServicePrice(0);
    setServiceAvailable(true);
    setSelectedEntertainmentService(null);
  };

  return (
    <Container>
      <h1>Entertainment Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainmentServices.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.type}</td>
              <td>{service.duration}</td>
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
        Add Entertainment Service
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEntertainmentService ? 'Edit Service' : 'Add Service'}</Modal.Title>
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
            <Form.Group controlId="formServiceType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter service duration"
                value={serviceDuration}
                onChange={(e) => setServiceDuration(e.target.value)}
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

export default EntertainmentPanel;
