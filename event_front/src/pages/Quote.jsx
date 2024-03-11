import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterMain from '../components/FooterMain'
const QuotePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    celebration: '',
    services: '',
    celebrationDate: '',
    priceRange: '',
    requirements: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Container>
        <NavbarComponent />
      <h1 className="mb-4">Enquiry Now</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone*</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formState">
                  <Form.Label>State*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCelebration">
                  <Form.Label>Celebration*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the type of celebration"
                    name="celebration"
                    value={formData.celebration}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formServices">
                  <Form.Label>Services*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the required services"
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCelebrationDate">
                  <Form.Label>Celebration Date*</Form.Label>
                  <Form.Control
                    type="date"
                    name="celebrationDate"
                    value={formData.celebrationDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPriceRange">
                  <Form.Label>Price Range*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the price range"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formRequirements">
                  <Form.Label>Requirements*</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <FooterMain />
    </Container>
  );
};

export default QuotePage;
