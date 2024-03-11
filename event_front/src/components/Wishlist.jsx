import { useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import Cookies from 'js-cookie';
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = 5;
  useEffect(() => {
    fetchWishlistItemsByUserId(userId); 
  }, []); 

  const fetchWishlistItemsByUserId = (userId) => {
    // Replace 'token' with the actual token received from authentication
    const token = Cookies.get('token'); 
    fetch(`http://localhost:8181/api/wishlists/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from server:', data); // Log the response
      setWishlistItems(data);
    })
    .catch(error => console.error('Error fetching wishlist items:', error));
  };    

  return (
    <div>
      <h2>Wishlist</h2>
      <Carousel>
        {[...Array(Math.ceil(wishlistItems.length / 5))].map((_, index) => (
          <Carousel.Item key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {wishlistItems.slice(index * 5, (index + 1) * 5).map((item) => (
                <Card key={item.id} style={{ width: '18rem', margin: '0 10px' }}>
                  <Card.Img variant="top" src={item.imgUrl} alt={item.itemName} />
                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>{item.category}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Wishlist;
