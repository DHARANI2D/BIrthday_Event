import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/FooterMain';

const Food = () => {
  const [foods, setFoods] = useState([]);
  const userId = Cookies.get('userId'); // replace 'userId' with the name of your cookie

  useEffect(() => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    // Fetch the food items
    fetch('http://localhost:8181/api/foods', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(foodData => {
        // Fetch the wishlist for the current user and category 'Food'
        fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Food`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(wishlistData => {
            // Update the wishlisted property of the food items that are in the wishlist
            const wishlistedFoodIds = wishlistData.map(item => item.foodId);
            setFoods(foodData.map(food => ({ ...food, wishlisted: wishlistedFoodIds.includes(food.id) })));
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleWishlistClick = (food) => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    if (food.wishlisted) {
      // If the food item is already in the wishlist, send a DELETE request
      fetch(`http://localhost:8181/api/wishlists/${food.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          // Update the food item's wishlisted status in the state
          setFoods(foods.map(f => f.id === food.id ? { ...f, wishlisted: false } : f));
        })
        .catch(error => console.error('Error deleting wishlist item:', error));
    } else {
      // If the food item is not in the wishlist, send a POST request
      fetch('http://localhost:8181/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: food.name,
          category: 'Food',
          imgUrl: food.imageUrl,
          userId
        })
      })
        .then(() => {
          // Update the food item's wishlisted status in the state
          setFoods(foods.map(f => f.id === food.id ? { ...f, wishlisted: true } : f));
        })
        .catch(error => console.error('Error adding wishlist item:', error));
    }
  };

  return (
    <Container>
      <NavbarComponent />
      {foods.reduce((acc, food, index) => {
        if (index % 4 === 0) acc.push([]);
        acc[acc.length - 1].push(food);
        return acc;
      }, []).map((foodsRow, index) => (
        <Row key={index} className="mb-4">
          {foodsRow.map(food => (
            <Col md={3} key={food.id}>
              <Card className="mt-4">
                {/* Assuming you have imageUrl in your FoodDto */}
                <Card.Img variant="top" src={food.imageUrl} />
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> {food.price}
                    <br />
                    <strong>Minimum Quantity:</strong> {food.minimumQuantity}
                    <br />
                    <strong>Menu:</strong> {food.menu.join(', ')}
                    <br />
                    <strong>Available:</strong> {food.available ? 'Yes' : 'No'}
                  </Card.Text>
                  <FaHeart onClick={() => handleWishlistClick(food)} color={food.wishlisted ? 'red' : 'grey'} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Footer />
    </Container>
  );
};

export default Food;
