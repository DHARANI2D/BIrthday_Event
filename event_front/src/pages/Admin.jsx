import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const usernameu = Cookies.get('username');
const profileImageUrl = usernameu ? `src/assets/images/Profile/${usernameu}.jpg` : '';

const Admin = () => {
  const [adminData, setAdminData] = useState({});
  const fetchAdminData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8181/api/userinfo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setAdminData(response.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
  };
  useEffect(() => {
    fetchAdminData(1); // replace 1 with actual userId
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center text-align-center">
      <Card style={{ width: '50%', marginBottom: '20px' }}>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>Current Admin</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {adminData.id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong> {adminData.name}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {adminData.email}
            </Card.Text>
            <Card.Text>
              <strong>Contact No:</strong> {adminData.contactNo}
            </Card.Text>
            <Card.Text>
              <strong>City:</strong> {adminData.city}
            </Card.Text>
            <Card.Text>
              <strong>Roles:</strong> {adminData.roles}
            </Card.Text>
          </div>
          <img src={profileImageUrl} alt="Profile" style={{ width: '150px', height: '150px' }} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Admin;