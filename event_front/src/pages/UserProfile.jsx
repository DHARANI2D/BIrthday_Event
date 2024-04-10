import { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import OrderDetails from '../components/OrderDetails';
import Wishlist from '../components/Wishlist';
import FooterMain from '../components/FooterMain';
import axios from 'axios';
import Cookies from 'js-cookie';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  console.log(userId);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    email: '',
    contactNo: '',
    city: ''
  });

  useEffect(() => {
    fetchInitialUserData();
  }, []);

  const fetchInitialUserData = async () => {
    try {
      const userId = Cookies.get('userId');
      const token = Cookies.get('token');

      if (!userId || !token) {
        // Handle case where user is not authenticated
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get(`http://localhost:8181/api/userinfo/${userId}`, config);
      setUserData(response.data);
      setUpdatedUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedUserData(userData);
  };

  const handleUpdateUser = async () => {
    try {
      


      if (!userId || !token) {
        // Handle case where user is not authenticated
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Extract only the fields to be updated
      const { name, email, contactNo, city } = updatedUserData;

      await axios.put(`http://localhost:8181/api/userinfo/${userId}`, { name, email, contactNo, city }, config);
      await fetchInitialUserData();
      setIsEditing(false);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user details. Please try again.');
    }
  };
  const usernameu=Cookies.get('username');
  console.log('name->',usernameu);
  const profileImageUrl = usernameu ? `src/assets/images/Profile/${usernameu}.jpg` : '';


  return (
    <div>
      <NavbarComponent />
      <Row>
        {/* Card for User Profile and Profile Image */}
        <Col md={6}>
          <Card style={{ margin: '10px' }}>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Row>
                <Col sm={6}>
                  <Form>
                    <Form.Group as={Row} controlId="formName">
                      <Form.Label column sm={4}>
                        Name:
                      </Form.Label>
                      <Col sm={8}>
                        {isEditing ? (
                          <Form.Control type="text" name="name" value={updatedUserData.name} onChange={handleInputChange} />
                        ) : (
                          <Form.Control plaintext readOnly defaultValue={userData && userData.name} />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formEmail">
                      <Form.Label column sm={4}>
                        Email:
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control plaintext readOnly defaultValue={userData && userData.email} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formMobile">
                      <Form.Label column sm={4}>
                        Contact No:
                      </Form.Label>
                      <Col sm={8}>
                        {isEditing ? (
                          <Form.Control type="text" name="contactNo" value={updatedUserData.contactNo} onChange={handleInputChange} />
                        ) : (
                          <Form.Control plaintext readOnly defaultValue={userData && userData.contactNo} />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCity">
                      <Form.Label column sm={4}>
                        City:
                      </Form.Label>
                      <Col sm={8}>
                        {isEditing ? (
                          <Form.Control type="text" name="city" value={updatedUserData.city} onChange={handleInputChange} />
                        ) : (
                          <Form.Control plaintext readOnly defaultValue={userData && userData.city} />
                        )}
                      </Col>
                    </Form.Group>
                    {isEditing ? (
                      <Row>
                        <Col sm={{ span: 8, offset: 4 }}>
                          <Button variant="primary" onClick={handleUpdateUser}>
                            Save
                          </Button>
                          <Button variant="secondary" onClick={handleCancelClick} style={{ marginLeft: '5px' }}>
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      <Button variant="info" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </Form>
                </Col>
                <Col sm={6}>
                  <img src={profileImageUrl} alt="Profile" style={{ width: '150px', height: '150px' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <OrderDetails />
        </Col>
      </Row>
      <Row>
      </Row>
      <Wishlist />
      <FooterMain />
    </div>
  );
};

export default User;