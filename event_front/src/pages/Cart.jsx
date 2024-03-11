import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FooterMain from '../components/FooterMain'
import Header from '../components/NavbarComponent'

const CheckoutPage = () => {
  const product = {
    name: 'Sample Product',
    price: 50.00, 
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotal = () => {
    return (product.price * quantity).toFixed(2);
  };

  return (
    <Container >
        <Header />
        <br />
      <Row>
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
              <Card.Text>Quantity: {quantity}</Card.Text>
              <Button variant="outline-primary" onClick={handleDecreaseQuantity}>
                -
              </Button>{' '}
              <Button variant="outline-primary" onClick={handleIncreaseQuantity}>
                +
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>
                Total Price: ${calculateTotal()}
              </Card.Text>
              <Button variant="success">Proceed to Checkout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: '150px' }}>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="warning" href='/event'>Alter Customization</Button>
      </div>        
      <FooterMain />
      </div>
    </Container>
  );
};

export default CheckoutPage;
