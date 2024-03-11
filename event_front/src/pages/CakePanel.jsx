import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const CakePanel = () => {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cakeName, setCakeName] = useState('');
  const [cakePrice, setCakePrice] = useState(0);
  const [cakeFlavour, setCakeFlavour] = useState('');
  const [cakeType, setCakeType] = useState('');
  const [cakeQuantity, setCakeQuantity] = useState(0);
  const [cakeImgUrl, setCakeImgUrl] = useState('');

  useEffect(() => {
    fetchCakes();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchCakes = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/cakes');
      setCakes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (cake) => {
    setSelectedCake(cake);
    setShowModal(true);
    setCakeName(cake.cakeName);
    setCakePrice(cake.price);
    setCakeFlavour(cake.flavour);
    setCakeType(cake.type);
    setCakeQuantity(cake.quantity);
    setCakeImgUrl(cake.imgUrl);
  };

  const handleSave = async () => {
    try {
      if (selectedCake) {
        const updatedCake = {
          id: selectedCake.id,
          cakeName: cakeName,
          price: cakePrice,
          flavour: cakeFlavour,
          type: cakeType,
          quantity: cakeQuantity,
          imgUrl: cakeImgUrl,
        };
        await axios.put(`http://localhost:8181/api/cakes/${selectedCake.id}`, updatedCake);
      } else {
        const newCake = {
          cakeName: cakeName,
          price: cakePrice,
          flavour: cakeFlavour,
          type: cakeType,
          quantity: cakeQuantity,
          imgUrl: cakeImgUrl,
        };
        await axios.post('http://localhost:8181/api/cakes', newCake);
      }
      handleClose();
      fetchCakes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (cakeId) => {
    try {
      await axios.delete(`http://localhost:8181/api/cakes/${cakeId}`);
      fetchCakes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCakeName('');
    setCakePrice(0);
    setCakeFlavour('');
    setCakeType('');
    setCakeQuantity(0);
    setCakeImgUrl('');
    setSelectedCake(null);
  };

  return (
    <Container>
      <h1>Cake Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Flavour</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map((cake) => (
            <tr key={cake.id}>
              <td>{cake.id}</td>
              <td>{cake.cakeName}</td>
              <td>{cake.price}</td>
              <td>{cake.flavour}</td>
              <td>{cake.type}</td>
              <td>{cake.quantity}</td>
              <td>{cake.imgUrl}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(cake)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(cake.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Cake
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCake ? 'Edit Cake' : 'Add Cake'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCakeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cake name"
                value={cakeName}
                onChange={(e) => setCakeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCakePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cake price"
                value={cakePrice}
                onChange={(e) => setCakePrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCakeFlavour">
              <Form.Label>Flavour</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cake flavour"
                value={cakeFlavour}
                onChange={(e) => setCakeFlavour(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCakeType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cake type"
                value={cakeType}
                onChange={(e) => setCakeType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCakeQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cake quantity"
                value={cakeQuantity}
                onChange={(e) => setCakeQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCakeImgUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cake image URL"
                value={cakeImgUrl}
                onChange={(e) => setCakeImgUrl(e.target.value)}
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

export default CakePanel;
