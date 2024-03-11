import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavbarComponent from '../components/NavbarComponent';
import Menubar from '../components/Menubar';
import FooterMain from '../components/FooterMain';

const ReturnGifts = () => {
  const [gifts, setGifts] = useState([]);
  const userId = Cookies.get('userId'); // replace 'userId' with the name of your cookie

  useEffect(() => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    // fetch the return gifts
    fetch('http://localhost:8181/api/return-gifts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(giftsData => {
        // fetch the wishlist for the current user and category 'Return Gifts'
        fetch(`http://localhost:8181/api/wishlists/user/${userId}?category=Return Gifts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(wishlistData => {
            // update the wishlisted property of the gifts that are in the wishlist
            const wishlistedGiftIds = wishlistData.map(item => item.giftId);
            setGifts(giftsData.map(gift => ({ ...gift, wishlisted: wishlistedGiftIds.includes(gift.id) })));
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleWishlistClick = (gift) => {
    const token = Cookies.get('token'); // replace 'token' with the name of your cookie

    if (gift.wishlisted) {
      // if the gift is already in the wishlist, send a DELETE request
      fetch(`http://localhost:8181/api/wishlists/${gift.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          // update the gift's wishlisted status in the state
          setGifts(gifts.map(g => g.id === gift.id ? { ...g, wishlisted: false } : g));
        })
        .catch(error => console.error('Error deleting wishlist item:', error));
    } else {
      // if the gift is not in the wishlist, send a POST request
      fetch('http://localhost:8181/api/wishlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: gift.name,
          category: 'Return Gifts',
          imgUrl: gift.imageUrl,
          userId
        })
      })
        .then(() => {
          // update the gift's wishlisted status in the state
          setGifts(gifts.map(g => g.id === gift.id ? { ...g, wishlisted: true } : g));
        })
        .catch(error => console.error('Error adding wishlist item:', error));
    }
  };

  return (
    <Container>
      <NavbarComponent />
      {gifts.reduce((acc, gift, index) => {
        if (index % 4 === 0) acc.push([]);
        acc[acc.length - 1].push(gift);
        return acc;
      }, []).map((giftsRow, index) => (
        <Row key={index} className="mb-4">
          {giftsRow.map((gift) => (
            <Col key={gift.id} md={3}>
              <Card className="mt-4">
                <Card.Img variant="top" src={gift.imageUrl} />
                <Card.Body>
                  <Card.Title>{gift.name}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {gift.description}
                    <br />
                    <strong>Price:</strong> {gift.price}
                    <br />
                    <strong>Minimum Quantity:</strong> {gift.minimumQuantity}
                    <br />
                    <strong>Stock:</strong> {gift.stock}
                  </Card.Text>
                  <FaHeart onClick={() => handleWishlistClick(gift)} color={gift.wishlisted ? 'red' : 'grey'} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Menubar />
      <FooterMain />
    </Container>
  );
};

export default ReturnGifts;