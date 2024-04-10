import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Cookies from 'js-cookie';

const Step2 = ({ handleNextPrevClick }) => {
  const [decorations, setDecorations] = useState([]);
  const [selectedDecorationId, setSelectedDecorationId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/decorations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDecorations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching decorations:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedDecorationIdFromCookie = Cookies.get('Step2');
      console.log('Selected Decoration ID from Cookie:', selectedDecorationIdFromCookie);
      if (selectedDecorationIdFromCookie) {
        try {
          const { id } = JSON.parse(selectedDecorationIdFromCookie); // Line 31
          setSelectedDecorationId(parseInt(id));
        } catch (error) {
          console.error('Error parsing cookie value as JSON:', error);
        }
      }

  }, []);

  const handleSelectDecoration = (decoration) => {
    setSelectedDecorationId(decoration.id);
    Cookies.set('Step2', JSON.stringify({ id: decoration.id, name: decoration.name, price: decoration.price }));
  };
  

  const handleNextStep = () => {
    if (selectedDecorationId) {
      handleNextPrevClick(4);
    } else {
      alert('Please select a decoration.');
    }
  };

  return (
    <div>
      <h2>Decoration Details</h2>
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
        {decorations.map(decoration => (
          <div className={`card ${selectedDecorationId === decoration.id ? 'selected' : ''}`} onClick={() => handleSelectDecoration(decoration)} key={decoration.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <h3>{decoration.name}</h3>
            <p>Type: {decoration.type}</p>
            <p>Area: {decoration.area}</p>
            <p>Price: {decoration.price}</p>
            <button className="btn btn-warning" onClick={() => handleSelectDecoration(decoration)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step2;
