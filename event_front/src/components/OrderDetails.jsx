import React, { useState, useEffect } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { BsCheck, BsClock, BsDot } from 'react-icons/bs';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8181/api/carts");
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const getProgressBarVariant = status => {
    switch (status) {
      case 1:
        return "warning"; // Yellow color
      case 2:
        return "info"; // Blue color
      case 3:
        return "danger"; // Red color
      case 4:
        return "success"; // Green color
      default:
        return "warning"; // Default to yellow for unknown status
    }
  };

  return (
    <Card style={{ margin: '10px' }}>
      <Card.Body>
        <Card.Title>Order Details</Card.Title>

        {/* Display Orders */}
        <div>
          <h5>All Orders</h5>
          <ul>
            {orders.map(order => (
              <li key={order.orderId}>
                <BsDot /> 
                {order.status === 4 ? (
                  <BsCheck color="green" />
                ) : (
                  <BsClock color="orange" />
                )}
                Order #{order.orderId} - Status: {order.status}
                <ProgressBar now={(order.status * 25)} label={order.status === 4 ? "Celebrated" : "In Progress"} variant={getProgressBarVariant(order.status)} />
              </li>
            ))}
          </ul>
        </div>

      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
