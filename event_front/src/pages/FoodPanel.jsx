import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const FoodPanel = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [menu, setMenu] = useState([]);
  const [foodAvailable, setFoodAvailable] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const token = Cookies.get('token');

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:8181/api/foods');
      setFoods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperation = (food) => {
    setSelectedFood(food);
    setShowModal(true);
    setFoodName(food.name);
    setFoodPrice(food.price);
    setMinimumQuantity(food.minimumQuantity);
    setMenu(food.menu);
    setFoodAvailable(food.available);
  };

  const handleSave = async () => {
    try {
      if (selectedFood) {
        const updatedFood = {
          id: selectedFood.id,
          name: foodName,
          price: foodPrice,
          minimumQuantity: minimumQuantity,
          menu: menu,
          available: foodAvailable,
        };
        await axios.put(`http://localhost:8181/api/foods/${selectedFood.id}`, updatedFood);
      } else {
        const newFood = {
          name: foodName,
          price: foodPrice,
          minimumQuantity: minimumQuantity,
          menu: menu,
          available: foodAvailable,
        };
        await axios.post('http://localhost:8181/api/foods', newFood);
      }
      handleClose();
      fetchFoods();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:8181/api/foods/${foodId}`);
      fetchFoods();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFoodName('');
    setFoodPrice(0);
    setMinimumQuantity(0);
    setMenu([]);
    setFoodAvailable(true);
    setSelectedFood(null);
  };

  return (
    <Container>
      <h1>Food Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Minimum Quantity</th>
            <th>Menu</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.minimumQuantity}</td>
              <td>{food.menu.join(', ')}</td>
              <td>{food.available ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(food)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(food.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Food
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFood ? 'Edit Food' : 'Add Food'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFoodName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFoodPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter food price"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
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
            <Form.Group controlId="formMenu">
              <Form.Label>Menu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu items separated by commas"
                value={menu.join(', ')}
                onChange={(e) => setMenu(e.target.value.split(',').map(item => item.trim()))}
              />
            </Form.Group>
            <Form.Group controlId="formFoodAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={foodAvailable}
                onChange={(e) => setFoodAvailable(e.target.checked)}
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

export default FoodPanel;
