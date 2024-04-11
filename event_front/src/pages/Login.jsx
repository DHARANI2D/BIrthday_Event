import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Toast } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import loginImage from '../assets/images/login2.jpg';
import Header from '../components/Brand';
import Footer from '../components/Footer';
import '../assets/css/Login.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username.trim()) {
      setErrorMessage('Username is required');
      return;
    }
  
    if (!password.trim()) {
      setErrorMessage('Password is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8181/auth/authenticate', {
        username: username,
        password: password,
      });
  
      // Assuming your API returns the token in the response data
      const token = response.data;
  
      // Store the token and username in cookies
      Cookies.set('token', token);
      Cookies.set('username', username);
      console.log('Token: ' + token);
      // Set the default authorization header for Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      console.log('Login Success:', response.data);
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = '/home';
    }
  }, [loginSuccess]);

  return (
    <div>
      <Header />
      <div className="container">
        <Row className="justify-content-center align-items-center mt-5">
          <Col xs={6}>
            <Card className="border-0">
              <Card.Body>
                <img src={loginImage} alt="Login Image" className="img-fluid" />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6}>
            <Card className="mx-auto border">
              <Card.Body>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicUsername" as={Col} md={12}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" as={Col} md={12}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group><br />

                  <div className="d-flex align-items-center justify-content-center">
                    <Button variant="primary" type="submit" className="w-100">
                      Login
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <GoogleLogin
                      clientId="YOUR_GOOGLE_CLIENT_ID"
                      buttonText="Login with Google"
                      cookiePolicy={'single_host_origin'}
                      className="google-login-button"
                    />
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
      {errorMessage && (
        // Inside the Login component
          <div className="overlay">
            <Toast className="error-toast" onClose={() => setErrorMessage('')} show={true} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
          </div>
      )}
    </div>
  );
};

export default Login;
