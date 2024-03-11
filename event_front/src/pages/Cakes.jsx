import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/FooterMain';

const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const userId = Cookies.get('userId'); // replace 'userId' with the name of your cookie

  useEffect(() => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    // Fetch the cakes
    fetch('http://localhost:8181/api/cakes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(cakeData => {
        // Fetch the wishlist for the current user and category 'Cakes'
        fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Cakes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(wishlistData => {
            // Update the wishlisted property of the cakes that are in the wishlist
            const wishlistedCakeIds = wishlistData.map(item => item.cakeId);
            setCakes(cakeData.map(cake => ({ ...cake, wishlisted: wishlistedCakeIds.includes(cake.id) })));
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleWishlistClick = (cake) => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    if (cake.wishlisted) {
      // If the cake is already in the wishlist, send a DELETE request
      fetch(`http://localhost:8181/api/wishlists/${cake.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          // Update the cake's wishlisted status in the state
          setCakes(cakes.map(c => c.id === cake.id ? { ...c, wishlisted: false } : c));
        })
        .catch(error => console.error('Error deleting wishlist item:', error));
    } else {
      // If the cake is not in the wishlist, send a POST request
      fetch('http://localhost:8181/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: cake.cakeName,
          category: 'Cakes',
          imgUrl: cake.imgUrl,
          userId
        })
      })
        .then(() => {
          // Update the cake's wishlisted status in the state
          setCakes(cakes.map(c => c.id === cake.id ? { ...c, wishlisted: true } : c));
        })
        .catch(error => console.error('Error adding wishlist item:', error));
    }
  };

  return (
    <Container>
      <NavbarComponent />
      {cakes.reduce((acc, cake, index) => {
        if (index % 4 === 0) acc.push([]);
        acc[acc.length - 1].push(cake);
        return acc;
      }, []).map((cakesRow, index) => (
        <Row key={index} className="mb-4">
          {cakesRow.map(cake => (
            <Col md={3} key={cake.id}>
              <Card className="mt-4">
                <Card.Img variant="top" src={cake.imgUrl} />
                <Card.Body>
                  <Card.Title>{cake.cakeName}</Card.Title>
                  <Card.Text>
                    <strong>Flavour:</strong> {cake.flavour}
                    <br />
                    <strong>Type:</strong> {cake.type}
                    <br />
                    <strong>Quantity:</strong> {cake.quantity}
                    <br />
                    <strong>Price:</strong> {cake.price}
                    <br />
                    <strong>Available:</strong> {cake.available ? 'Yes' : 'No'}
                  </Card.Text>
                  <FaHeart onClick={() => handleWishlistClick(cake)} color={cake.wishlisted ? 'red' : 'grey'} />
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

export default Cakes;
