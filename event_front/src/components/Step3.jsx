import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Cookies from 'js-cookie';

const Step3 = ({ handleNextPrevClick }) => {
  const [photographyServices, setPhotographyServices] = useState([]);
  const [selectedPhotographyServiceId, setSelectedPhotographyServiceId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/photography', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPhotographyServices(response.data);
      } catch (error) {
        console.error('Error fetching photography services:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedPhotographyServiceIdFromCookie = Cookies.get('Step3');
    if (selectedPhotographyServiceIdFromCookie) {
      const { id } = JSON.parse(selectedPhotographyServiceIdFromCookie);
      setSelectedPhotographyServiceId(parseInt(id));
    }
  }, []);

  const handleSelectPhotographyService = (photographyService) => {
    setSelectedPhotographyServiceId(photographyService.id);
    Cookies.set('Step3', JSON.stringify({ id: photographyService.id, name: photographyService.name, price: photographyService.price }));
  };
  

  const handleNextStep = () => {
    if (selectedPhotographyServiceId) {
      handleNextPrevClick(4); // Assuming Step4 is the next step
    } else {
      alert('Please select a photography service.');
    }
  };

  return (
    <div>
      <h2>Photography Services</h2>
      <style>
        {`
          .card-container {
            display: flex;
            flex-wrap: wrap;
            text-align: center;
          }
          
          .card {
            flex: 0 0 calc(33.33% - 20px);
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
        {photographyServices.map(service => (
          <div className={`card ${selectedPhotographyServiceId === service.id ? 'selected' : ''}`} onClick={() => handleSelectPhotographyService(service)} key={service.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <h3>{service.name}</h3>
            <p>Location: {service.location}</p>
            <p>Price: {service.price}</p>
            <button className="btn btn-warning" onClick={() => handleSelectPhotographyService(service)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step3;
