import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Step6 = ({ handleNextPrevClick }) => {
  const [returnGifts, setReturnGifts] = useState([]);
  const [selectedReturnGiftId, setSelectedReturnGiftId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/return-gifts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReturnGifts(response.data);
      } catch (error) {
        console.error('Error fetching return gifts:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedReturnGiftIdFromCookie = Cookies.get('Step6');
    if (selectedReturnGiftIdFromCookie) {
      const { id } = JSON.parse(selectedReturnGiftIdFromCookie);
      setSelectedReturnGiftId(id); // Fixed typo here
    }
  }, []);

  const handleSelectReturnGift = (returnGift) => {
    setSelectedReturnGiftId(returnGift.id);
    Cookies.set('Step6', JSON.stringify({ id: returnGift.id, name: returnGift.name, price: returnGift.price }));
  };
  
  const handleNextStep = () => {
    if (selectedReturnGiftId) {
      handleNextPrevClick(8);
    } else {
      alert('Please select a return gift.');
    }
  };

  return (
    <div>
      <h2>Return Gifts</h2>
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
        {returnGifts.map(gift => (
          <div className={`card ${selectedReturnGiftId === gift.id ? 'selected' : ''}`} onClick={() => handleSelectReturnGift(gift)} key={gift.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <h3>{gift.name}</h3>
            <p>Minimum Quantity: {gift.minimumQuantity}</p>
            <p>Price: {gift.price}</p>
            <p>Stock: {gift.stock}</p>
            <button className="btn btn-warning" onClick={() => handleSelectReturnGift(gift)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step6;
