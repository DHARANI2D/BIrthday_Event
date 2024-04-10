import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Cookies from 'js-cookie';
import Cal from '../assets/images/bookcal.jpg';

const Stepdate = ({ handleNextPrevClick }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const selectedDateFromCookie = Cookies.get('Step2');
    if (selectedDateFromCookie) {
      setSelectedDate(new Date(selectedDateFromCookie));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    Cookies.set('Step2', date.toISOString());
    console.log(Cookies.get('Step2'));
  };

  const handleNextStep = () => {
    if (selectedDate) {
      handleNextPrevClick(1);
    } else {
      alert('Please select a date.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1'}}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', border: 'none' }}>
          <CardMedia
            component="img"
            src={Cal}
            alt="Event"
            style={{ Width: '300px', height: '500px' }}
          />
        </Card>
      </div>
  
      {/* Card with Calendar - Right Side */}
      <div style={{ flex: '1' }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', border: 'none' }}>
          {/* Calendar component */}
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            style={{ border: 'none'}} 
          />
          <br />
        <div className="d-flex justify-content-end"><button className="btn btn-primary" onClick={handleNextStep}>Next</button></div>
        </Card>
      </div>
    </div>  
  );
   
}
export default Stepdate;
