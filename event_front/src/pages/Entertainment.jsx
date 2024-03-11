import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/FooterMain';

const Entertainment = () => {
  const [entertainmentServices, setEntertainmentServices] = useState([]);
  const userId = Cookies.get('userId'); // replace 'userId' with the name of your cookie

  useEffect(() => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    // Fetch the entertainment services
    fetch('http://localhost:8181/api/entertainment', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(entertainmentData => {
        // Fetch the wishlist for the current user and category 'Entertainment'
        fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Entertainment`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(wishlistData => {
            // Update the wishlisted property of the entertainment services that are in the wishlist
            const wishlistedServiceIds = wishlistData.map(item => item.serviceId);
            setEntertainmentServices(entertainmentData.map(service => ({ ...service, wishlisted: wishlistedServiceIds.includes(service.id) })));
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleWishlistClick = (service) => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    if (service.wishlisted) {
      // If the service is already in the wishlist, send a DELETE request
      fetch(`http://localhost:8181/api/wishlists/${service.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          // Update the service's wishlisted status in the state
          setEntertainmentServices(services => services.map(s => s.id === service.id ? { ...s, wishlisted: false } : s));
        })
        .catch(error => console.error('Error deleting wishlist item:', error));
    } else {
      // If the service is not in the wishlist, send a POST request
      fetch('http://localhost:8181/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: service.name,
          category: 'Entertainment',
          imgUrl: service.imageUrl,
          userId
        })
      })
        .then(() => {
          // Update the service's wishlisted status in the state
          setEntertainmentServices(services => services.map(s => s.id === service.id ? { ...s, wishlisted: true } : s));
        })
        .catch(error => console.error('Error adding wishlist item:', error));
    }
  };

  return (
    <Container>
      <NavbarComponent />
      {entertainmentServices.reduce((acc, service, index) => {
        if (index % 4 === 0) acc.push([]);
        acc[acc.length - 1].push(service);
        return acc;
      }, []).map((servicesRow, index) => (
        <Row key={index} className="mb-4">
          {servicesRow.map(service => (
            <Col md={3} key={service.id}>
              <Card className="mt-4">
                <Card.Img variant="top" src={service.imageUrl} />
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>
                    <strong>Type:</strong> {service.type}
                    <br />
                    <strong>Duration:</strong> {service.duration} minutes
                    <br />
                    <strong>Price:</strong> {service.price}
                    <br />
                    <strong>Available:</strong> {service.available ? 'Yes' : 'No'}
                  </Card.Text>
                  <FaHeart onClick={() => handleWishlistClick(service)} color={service.wishlisted ? 'red' : 'grey'} />
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

export default Entertainment;
