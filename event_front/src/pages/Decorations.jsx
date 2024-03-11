import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/FooterMain';

const Decoration = () => {
  const [decorations, setDecorations] = useState([]);
  const userId = Cookies.get('userId'); // replace 'userId' with the name of your cookie

  useEffect(() => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    // Fetch the decorations
    fetch('http://localhost:8181/api/decorations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(decorationData => {
        // Fetch the wishlist for the current user and category 'Decoration'
        fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Decoration`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(wishlistData => {
            // Update the wishlisted property of the decorations that are in the wishlist
            const wishlistedDecorationIds = wishlistData.map(item => item.decorationId);
            setDecorations(decorationData.map(decoration => ({ ...decoration, wishlisted: wishlistedDecorationIds.includes(decoration.id) })));
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleWishlistClick = (decoration) => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    if (decoration.wishlisted) {
      // If the decoration is already in the wishlist, send a DELETE request
      fetch(`http://localhost:8181/api/wishlists/${decoration.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          // Update the decoration's wishlisted status in the state
          setDecorations(decorations.map(d => d.id === decoration.id ? { ...d, wishlisted: false } : d));
        })
        .catch(error => console.error('Error deleting wishlist item:', error));
    } else {
      // If the decoration is not in the wishlist, send a POST request
      fetch('http://localhost:8181/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: decoration.name,
          category: 'Decoration',
          imgUrl: decoration.imageUrl,
          userId
        })
      })
        .then(() => {
          // Update the decoration's wishlisted status in the state
          setDecorations(decorations.map(d => d.id === decoration.id ? { ...d, wishlisted: true } : d));
        })
        .catch(error => console.error('Error adding wishlist item:', error));
    }
  };

  return (
    <Container>
      <NavbarComponent />
      {decorations.reduce((acc, decoration, index) => {
        if (index % 4 === 0) acc.push([]);
        acc[acc.length - 1].push(decoration);
        return acc;
      }, []).map((decorationsRow, index) => (
        <Row key={index} className="mb-4">
          {decorationsRow.map(decoration => (
            <Col md={3} key={decoration.id}>
              <Card className="mt-4">
                <Card.Img variant="top" src={decoration.imageUrl} />
                <Card.Body>
                  <Card.Title>{decoration.name}</Card.Title>
                  <Card.Text>
                    <strong>Type:</strong> {decoration.type}
                    <br />
                    <strong>Area:</strong> {decoration.area}
                    <br />
                    <strong>Price:</strong> {decoration.price}
                    <br />
                    <strong>Available:</strong> {decoration.available ? 'Yes' : 'No'}
                  </Card.Text>
                  <FaHeart onClick={() => handleWishlistClick(decoration)} color={decoration.wishlisted ? 'red' : 'grey'} />
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

export default Decoration;
