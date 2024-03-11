import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import '../assets/css/Pay.css';
import axios from 'axios';
const SummaryCheckoutPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [taxCharges, setTaxCharges] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const [orderId, setOrderId] = useState('');
  const token =Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const selectedVenues = Cookies.get('Step1') ? JSON.parse(Cookies.get('Step1')) : null;
  const selectedDecorations = Cookies.get('Step2') ? JSON.parse(Cookies.get('Step2')) : null;
  const selectedPhotographyService = Cookies.get('Step3') ? JSON.parse(Cookies.get('Step3')) : null;
  const selectedCakes = Cookies.get('Step4') ? JSON.parse(Cookies.get('Step4')) : null;
  const selectedEntertainmentService = Cookies.get('Step5') ? JSON.parse(Cookies.get('Step5')) : null;
  const selectedReturnGift = Cookies.get('Step6') ? JSON.parse(Cookies.get('Step6')) : null;
  const selectedFood = Cookies.get('Step7') ? JSON.parse(Cookies.get('Step7')) : null;

  // Calculate subtotal
  useEffect(() => {
    let total = 0;
    if (selectedVenues) total += parseFloat(selectedVenues.price);
    if (selectedDecorations) total += parseFloat(selectedDecorations.price);
    if (selectedPhotographyService) total += parseFloat(selectedPhotographyService.price);
    if (selectedCakes) total += parseFloat(selectedCakes.price);
    if (selectedEntertainmentService) total += parseFloat(selectedEntertainmentService.price);
    if (selectedReturnGift) total += parseFloat(selectedReturnGift.price);
    if (selectedFood) total += parseFloat(selectedFood.price);
    setSubtotal(total);
  }, [selectedVenues, selectedDecorations, selectedPhotographyService, selectedCakes, selectedEntertainmentService, selectedReturnGift, selectedFood]);
  
  // Calculate tax charges and grand total
  useEffect(() => {
    const taxRate = 0.1; // 10% tax rate (adjust as needed)
    const tax = subtotal * taxRate;
    setTaxCharges(tax);
    setGrandTotal(subtotal + tax);
  }, [subtotal]);
  const orderId1 = Math.floor(100000 + Math.random() * 900000);
  const user = Cookies.get('userId');
  console.log(user);
  // Prepare data to be sent to the backend
  const handleProceedToCart = async () => {
    try {
      // Get the IDs of the categories from cookies
      const categoryIds = {
        orderId: orderId1,
        cake: selectedCakes.id,
        venue: selectedVenues.id,
        photography: selectedPhotographyService.id,
        food: selectedFood.id,
        entertainment: selectedEntertainmentService.id,
        decorations: selectedDecorations.id,
        gift: selectedReturnGift.id,
        status: 1,
        userid: user
      };
  
      // Send category IDs to the backend to create a cart item
      const response = await axios.post('http://localhost:8181/api/carts', categoryIds);
  
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        setShowPaymentOverlay(true);
        setOrderId(response.data.orderId); // Set the orderId received from the backend
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClosePaymentOverlay = () => {
    Cookies.remove('Step1');
    Cookies.remove('Step2');
    Cookies.remove('Step3');
    Cookies.remove('Step4');
    Cookies.remove('Step5');
    Cookies.remove('Step6');
    Cookies.remove('Step7');
    setShowPaymentOverlay(false);
    window.location.href = '/user';
  };


  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
            <h2>SUMMARY</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Venue</td>
                <td>{selectedVenues ? selectedVenues.name : 'No venue selected'}</td>
                <td>${selectedVenues ? parseFloat(selectedVenues.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Decoration</td>
                <td>{selectedDecorations ? selectedDecorations.name : 'No decoration selected'}</td>
                <td>${selectedDecorations ? parseFloat(selectedDecorations.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Photography Service</td>
                <td>{selectedPhotographyService ? selectedPhotographyService.name : 'No photography service selected'}</td>
                <td>${selectedPhotographyService ? parseFloat(selectedPhotographyService.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Cake</td>
                <td>{selectedCakes ? selectedCakes.name : 'No cake service selected'}</td>
                <td>${selectedCakes ? parseFloat(selectedCakes.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Entertainment Service</td>
                <td>{selectedEntertainmentService ? selectedEntertainmentService.name : 'No entertainment service selected'}</td>
                <td>${selectedEntertainmentService ? parseFloat(selectedEntertainmentService.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Return Gift</td>
                <td>{selectedReturnGift ? selectedReturnGift.name : 'No return gift selected'}</td>
                <td>${selectedReturnGift ? parseFloat(selectedReturnGift.price).toFixed(2) : '0.00'}</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Food Service</td>
                <td>{selectedFood ? selectedFood.name : 'No food service selected'}</td>
                <td>${selectedFood ? parseFloat(selectedFood.price).toFixed(2) : '0.00'}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Col sm={3}>
          <div className="d-flex justify-content-end">
            <Card style={{ width: '500px', marginTop: '20px' }}>
              <Card.Body>
                <Card.Title>Cart Totals</Card.Title>
                <Table bordered className="text-white">
                  <tbody style={{ border: '1px solid white' }}>
                    <tr>
                      <td>Subtotal</td>
                      <td>:</td>
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Tax Charges</td>
                      <td>:</td>
                      <td>${taxCharges.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Grand Total</td>
                      <td>:</td>
                      <td>${grandTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
                <center><Button variant="primary" onClick={handleProceedToCart}>Proceed to Cart Page</Button></center>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {showOverlay && (
  <div className="overlay" style={{ width: '100%', height: '100%' }}>
  <Card className="text-center" style={{ width: '300px',height:'500px' }}>
    <Card.Body>
      <iframe src="src/assets/images/pay.png" style={{ width: '100%', height: '100%', border: 'none' ,position:'sticky'}} />
    </Card.Body>
  </Card>
</div>

)}

{/* Payment successful overlay */}
{showPaymentOverlay && (
        <div className="overlay">
          <Card className="text-center">
            <Card.Body style={{ background: 'rgb(242, 248, 255)' }}>
              <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
              <Card.Title>Payment Successful</Card.Title>
              <p>Order ID: {orderId}</p>
              <Button variant="primary" onClick={handleClosePaymentOverlay}>Close</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default SummaryCheckoutPage;