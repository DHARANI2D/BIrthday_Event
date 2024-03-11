import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../assets/images/carousel1.png';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.png';

const CarouselComponent = () => {
  return (
    <Carousel style={{ maxHeight: '400px' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel1}
          alt="First slide"
          style={{ height: '400px', objectFit: 'fill' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel2}
          alt="First slide"
          style={{ height: '400px', objectFit: 'fill' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel3}
          alt="First slide"
          style={{ height: '400px', objectFit: 'fill' }}
        />
      </Carousel.Item>
      {/* Add more Carousel.Items for additional images */}
    </Carousel>
  );
};

export default CarouselComponent;
