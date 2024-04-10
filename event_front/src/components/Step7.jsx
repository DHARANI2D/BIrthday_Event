import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Step7 = ({ handleNextPrevClick }) => {
  const [foods, setFoods] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/foods', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedFoodIdFromCookie = Cookies.get('Step7');
    if (selectedFoodIdFromCookie) {
      const { id } = JSON.parse(selectedFoodIdFromCookie);
      setSelectedFoodId(id); // Corrected to set the food ID from the cookie
    }
  }, []);

  const handleSelectFood = (food) => {
    setSelectedFoodId(food.id);
    Cookies.set('Step7', JSON.stringify({ id: food.id, name: food.name, price: food.price }));
  };

  const handleNextStep = () => {
    if (selectedFoodId) {
      handleNextPrevClick(9);
    } else {
      alert('Please select a food.');
    }
  };

  return (
    <div>
      <h2>Food Services</h2>
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
        {foods.map(food => (
          <div className={`card ${selectedFoodId === food.id ? 'selected' : ''}`} onClick={() => handleSelectFood(food)} key={food.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <h3>{food.name}</h3>
            <p>Price: {food.price}</p>
            <p>Minimum Quantity: {food.minimumQuantity}</p>
            <p>Menu: {food.menu.join(', ')}</p>
            <button className="btn btn-warning" onClick={() => handleSelectFood(food)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step7;
