import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Step5 = ({ handleNextPrevClick }) => {
  const [entertainmentServices, setEntertainmentServices] = useState([]);
  const [selectedEntertainmentServiceId, setSelectedEntertainmentServiceId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/entertainment', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEntertainmentServices(response.data);
      } catch (error) {
        console.error('Error fetching entertainment services:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedServiceFromCookie = Cookies.get('Step5');
    if (selectedServiceFromCookie) {
      const { id, name } = JSON.parse(selectedServiceFromCookie);
      setSelectedEntertainmentServiceId(id);
    }
  }, []);

  const handleSelectEntertainmentService = (entertainmentService) => {
    setSelectedEntertainmentServiceId(entertainmentService.id);
    Cookies.set('Step5', JSON.stringify({ id: entertainmentService.id, name: entertainmentService.name, price: entertainmentService.price }));
  };
  

  const handleNextStep = () => {
    if (selectedEntertainmentServiceId) {
      handleNextPrevClick(6);
    } else {
      alert('Please select an entertainment service.');
    }
  };

  return (
    <div>
      <h2>Entertainment Services</h2>
      <style>
        {`
          .card-container {
            display: flex;
            flex-wrap: wrap;
            text-align: center;
          }
          
          .card {
            flex: 0 0 calc(33.33% - 20px); /* Adjust width of cards as needed */
            margin: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            cursor: pointer;
          }
          
          .card.selected {
            background-color: #E0F4FC;
          }
        `}
      </style>
      <div className="card-container">
        {entertainmentServices && entertainmentServices.map(service => (
          <div
            className={`card ${selectedEntertainmentServiceId === service.id ? 'selected' : ''}`}
            onClick={() => handleSelectEntertainmentService(service)}
            key={service.id}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <h3>{service.name}</h3>
            <p>Type: {service.type}</p>
            <p>Duration: {service.duration}</p>
            <p>Price: {service.price}</p>
            <button className="btn btn-warning" onClick={() => handleSelectEntertainmentService(service)}>Select</button>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step5;
