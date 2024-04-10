import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import img from '../assets/images/cal.jpg';
import Cookies from 'js-cookie';

const Step9 = ({ handleNextPrevClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Load selected date from cookies on component mount
    const storedDate = Cookies.get('selectedDate');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Store selected date in cookies
    Cookies.set('selectedDate', date.toISOString(), { expires: 7 }); // Expires in 7 days
  };

  const handleNext = () => {
    // Example of handling navigation to the next step
    handleNextPrevClick(2); // Assuming Step1 is the next step
  };

  return (
    <Container fluid>
      <Row>
        <h2>Event Date</h2>
        <Col sm={6}>
          <div className="image-container" style={{ border: 'none' }}>
            <Card>
              <Card.Body>
                <Card.Img variant="top" src={img} />
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col sm={6}>
          {/* Selected date display */}
          <Row className="mb-3">
            <Col>
              <h5 className="text-center">Selected Date: {selectedDate.toLocaleDateString()}</h5><br />
            </Col>
          </Row>
          {/* Calendar Component */}
          <Row>
            <div className="calendar-container" style={{ marginLeft: '200px' }}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                calendarType="US"
                minDate={new Date()}
              /><br /><br /><br /><br />
            </div>
          </Row>
          <Row className="mt-3">
            <Col className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Step9;
