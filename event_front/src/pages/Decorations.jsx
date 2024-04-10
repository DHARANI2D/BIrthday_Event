import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/FooterMain';

const Decoration = () => {
  const [decorations, setDecorations] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const token = Cookies.get('token');

        const decorationsResponse = await fetch('http://localhost:8181/api/decorations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!decorationsResponse.ok) {
          throw new Error('Failed to fetch decorations');
        }

        const decorationData = await decorationsResponse.json();

        const wishlistResponse = await fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Decoration`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!wishlistResponse.ok) {
          throw new Error('Failed to fetch decoration wishlist');
        }

        const wishlistData = await wishlistResponse.json();

        const wishlistedDecorationIds = wishlistData.map(item => item.decorationId);
        setDecorations(decorationData.map(decoration => ({ ...decoration, wishlisted: wishlistedDecorationIds.includes(decoration.id) })));

      } catch (error) {
        console.error('Error fetching decoration data:', error);
      }
    };

    fetchDecorations();
  }, [userId]);

  const handleWishlistClick = async (decoration) => {
    try {
      const token = Cookies.get('token');

      const response = await fetch(`http://localhost:8181/api/wishlists/${decoration.id}`, {
        method: decoration.wishlisted ? 'DELETE' : 'POST',
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
      });

      if (!response.ok) {
        throw new Error(`Failed to ${decoration.wishlisted ? 'remove' : 'add'} decoration wishlist item`);
      }

      setDecorations(decorations.map(d => d.id === decoration.id ? { ...d, wishlisted: !decoration.wishlisted } : d));

    } catch (error) {
      console.error(`Error ${decoration.wishlisted ? 'removing' : 'adding'} decoration wishlist item:`, error);
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
