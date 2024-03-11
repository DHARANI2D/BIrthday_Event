// FeedbackPage.js
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import FooterMain from '../components/FooterMain'
import Header from '../components/NavbarComponent'
const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback({ name: '', email: '', message: '' });
  };

  return (
    <Container>
        <Header />
      <h1>Feedback</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={feedback.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={feedback.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Feedback Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your feedback"
            name="message"
            value={feedback.message}
            onChange={handleInputChange}
          />
        </Form.Group>
<br />
        <Button variant="primary" type="submit">
          Submit Feedback
        </Button>
      </Form>
    <FooterMain />
    </Container>
  );
};

export default FeedbackPage;
