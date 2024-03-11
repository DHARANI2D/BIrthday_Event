import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Cookies from 'js-cookie';

const Step1 = ({ handleNextPrevClick }) => {
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8181/api/venues', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const selectedVenueIdFromCookie = Cookies.get('Step1');
    if (selectedVenueIdFromCookie) {
      const { id, name } = JSON.parse(selectedVenueIdFromCookie);
      setSelectedVenueId(parseInt(id));
    }
  }, []);

  const handleSelectVenue = (venue) => {
    setSelectedVenueId(venue.id);
    Cookies.set('Step1', JSON.stringify({ id: venue.id, name: venue.name, price: venue.price }));
    console.log(venue.price);
  };

  const handleNextStep = () => {
    if (selectedVenueId) {
      handleNextPrevClick(2);
    } else {
      alert('Please select a venue.');
    }
  };

  return (
    <div>
      <h2>Venue Details</h2>
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
            cursor: pointer; /* Add cursor pointer to indicate clickable */
          }
          
          .card.selected {
            background-color: #E0F4FC; /* Change background color for selected card */
          }
        `}
      </style>
      <div className="card-container">
        {venues.map(venue => (
          <div className={`card ${selectedVenueId === venue.id ? 'selected' : ''}`} onClick={() => handleSelectVenue(venue)} key={venue.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>           
            <img src={venue.imageUrl} alt={venue.name} height={'200px'} width={'200px'} />
            <h3>{venue.name}</h3>
            <p>Location: {venue.location}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: {venue.price}</p>
            <button className="btn btn-warning" onClick={() => handleSelectVenue(venue)}>Select</button>          
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
    </div>
  );
};

export default Step1;
