import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderPanel = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(1); // Default status to 1

  useEffect(() => {
    fetchOrders();
  }, []);

  const token = Cookies.get('token'); // Replace this with your actual access token

  // Set default headers for all requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/carts');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStatus = async () => {
    try {
      await axios.put(`http://localhost:8181/api/carts/${selectedOrder.id}`, { status: status, orderId: selectedOrder.orderId });
      fetchOrders();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
   

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setStatus(1); // Reset status to default
  };

  return (
    <Container>
      <h1>Order Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderId}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="warning" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>
                  Edit Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(parseInt(e.target.value))}
            >
              <option value={1}>Booked</option>
              <option value={2}>Preparing</option>
              <option value={3}>Executing</option>
              <option value={4}>Celebrated</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderPanel;
