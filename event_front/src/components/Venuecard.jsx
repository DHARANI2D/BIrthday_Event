import React from 'react';

const VenueCard = ({id, name, location, capacity, price, available, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt="Venue" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Location: {location}</p>
        <p className="card-text">Capacity: {capacity}</p>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">Availability: {available ? 'Available' : 'Not Available'}</p>
      </div>
    </div>
  );
};

export default VenueCard;
