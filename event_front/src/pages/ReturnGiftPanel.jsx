import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const ReturnGiftPanel = () => {
  const [returnGifts, setReturnGifts] = useState([]);
  const [selectedReturnGift, setSelectedReturnGift] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [giftName, setGiftName] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [giftPrice, setGiftPrice] = useState(0);
  const [giftStock, setGiftStock] = useState(0);

  useEffect(() => {
    fetchReturnGifts();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchReturnGifts = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/return-gifts');
      setReturnGifts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (gift) => {
    setSelectedReturnGift(gift);
    setShowModal(true);
    setGiftName(gift.name);
    setMinimumQuantity(gift.minimumQuantity);
    setGiftPrice(gift.price);
    setGiftStock(gift.stock);
  };

  const handleSave = async () => {
    try {
      if (selectedReturnGift) {
        const updatedGift = {
          id: selectedReturnGift.id,
          name: giftName,
          minimumQuantity: minimumQuantity,
          price: giftPrice,
          stock: giftStock,
        };
        await axios.put(`http://localhost:8181/api/return-gifts/${selectedReturnGift.id}`, updatedGift);
      } else {
        const newGift = {
          name: giftName,
          minimumQuantity: minimumQuantity,
          price: giftPrice,
          stock: giftStock,
        };
        await axios.post('http://localhost:8181/api/return-gifts', newGift);
      }
      handleClose();
      fetchReturnGifts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (giftId) => {
    try {
      await axios.delete(`http://localhost:8181/api/return-gifts/${giftId}`);
      fetchReturnGifts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setGiftName('');
    setMinimumQuantity(0);
    setGiftPrice(0);
    setGiftStock(0);
    setSelectedReturnGift(null);
  };

  return (
    <Container>
      <h1>Return Gift Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Minimum Quantity</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnGifts.map((gift) => (
            <tr key={gift.id}>
              <td>{gift.id}</td>
              <td>{gift.name}</td>
              <td>{gift.minimumQuantity}</td>
              <td>{gift.price}</td>
              <td>{gift.stock}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(gift)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(gift.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Return Gift
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedReturnGift ? 'Edit Gift' : 'Add Gift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGiftName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gift name"
                value={giftName}
                onChange={(e) => setGiftName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMinimumQuantity">
              <Form.Label>Minimum Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter minimum quantity"
                value={minimumQuantity}
                onChange={(e) => setMinimumQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGiftPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter gift price"
                value={giftPrice}
                onChange={(e) => setGiftPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGiftStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter gift stock"
                value={giftStock}
                onChange={(e) => setGiftStock(e.target.value)}
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

export default ReturnGiftPanel;
