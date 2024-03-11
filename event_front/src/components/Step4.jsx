import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Cookies from 'js-cookie';

const Step4 = ({ handleNextPrevClick }) => {
  const [cakes, setCakes] = useState([]);
  const [selectedCakeId, setSelectedCakeId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/cakes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCakes(response.data);
      } catch (error) {
        console.error('Error fetching cakes:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedCakeIdFromCookie = Cookies.get('Step4');
    if (selectedCakeIdFromCookie) {
      const { id ,name} = JSON.parse(selectedCakeIdFromCookie);
      setSelectedCakeId(parseInt(id));
    }
  }, []);

  const handleSelectCake = (cake) => {
    setSelectedCakeId(cake.id);
    Cookies.set('Step4', JSON.stringify({ id: cake.id, name: cake.cakeName, price: cake.price }));
  };
  

  const handleNextStep = () => {
    if (selectedCakeId) {
      handleNextPrevClick(5);
    } else {
      alert('Please select a cake service.');
    }
  };

  return (
    <div>
      <h2>Cake Services</h2>
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
        {cakes.map(cake => (
          <div className={`card ${selectedCakeId === cake.id ? 'selected' : ''}`} onClick={() => handleSelectCake(cake)} key={cake.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <h3>{cake.cakeName}</h3>
            <p>Price: {cake.price}</p>
            <p>Flavour: {cake.flavour}</p>
            <p>Type: {cake.type}</p>
            <button className="btn btn-warning" onClick={() => handleSelectCake(cake)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step4;
