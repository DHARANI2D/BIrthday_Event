import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const VenuePanel = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [venueName, setVenueName] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [venuePrice, setVenuePrice] = useState('');
  const [venueAvailable, setVenueAvailable] = useState(true); // Default to true
  const [venueImageUrl, setVenueImageUrl] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const token = Cookies.get('token'); // Replace this with your actual access token

  // Set default headers for all requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/venues');
      setVenues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (venue) => {
    setSelectedVenue(venue);
    setShowModal(true);
    setVenueName(venue.name);
    setVenueLocation(venue.location);
    setVenueCapacity(venue.capacity);
    setVenuePrice(venue.price);
    setVenueAvailable(venue.available);
    setVenueImageUrl(venue.imageUrl);
  };

  const handleSave = async () => {
    try {
      if (selectedVenue) {
        const updatedVenue = {
          id: selectedVenue.id,
          name: venueName,
          location: venueLocation,
          capacity: venueCapacity,
          price: venuePrice,
          available: venueAvailable,
          imageUrl: venueImageUrl,
        };
        await axios.put(`http://localhost:8181/api/venues/${selectedVenue.id}`, updatedVenue);
      } else {
        const newVenue = {
          name: venueName,
          location: venueLocation,
          capacity: venueCapacity,
          price: venuePrice,
          available: venueAvailable,
          imageUrl: venueImageUrl,
        };
        await axios.post('http://localhost:8181/api/venues', newVenue);
      }
      handleClose();
      fetchVenues();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (venueId) => {
    try {
      await axios.delete(`http://localhost:8181/api/venues/${venueId}`);
      fetchVenues();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setVenueName('');
    setVenueLocation('');
    setVenueCapacity('');
    setVenuePrice('');
    setVenueAvailable(true); // Reset to true
    setVenueImageUrl('');
    setSelectedVenue(null);
  };

  return (
    <Container>
      <h1>Venue Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td>{venue.location}</td>
              <td>{venue.capacity}</td>
              <td>{venue.price}</td>
              <td>{venue.available ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(venue)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(venue.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Venue
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVenue ? 'Edit Venue' : 'Add Venue'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formVenueName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formVenueLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue location"
                value={venueLocation}
                onChange={(e) => setVenueLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formVenueCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter venue capacity"
                value={venueCapacity}
                onChange={(e) => setVenueCapacity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formVenuePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter venue price"
                value={venuePrice}
                onChange={(e) => setVenuePrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formVenueAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={venueAvailable}
                onChange={(e) => setVenueAvailable(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="formVenueImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue image URL"
                value={venueImageUrl}
                onChange={(e) => setVenueImageUrl(e.target.value)}
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

export default VenuePanel;
