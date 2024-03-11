import { Carousel } from 'react-bootstrap';

const ReviewsSlider = () => {
  return (
    <section id="reviews" className="py-5">
      <div className="container py-5">
        <h2 className="text-center mb-4">Happy Customers</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-customer-image-1.jpg"
              alt="Customer 1"
            />
            <Carousel.Caption>
              <h4>Customer Review 1</h4>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                Sed nisi."
              </p>
              <p className="text-muted">- John Doe</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-customer-image-2.jpg"
              alt="Customer 2"
            />
            <Carousel.Caption>
              <h4>Customer Review 2</h4>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                Sed nisi."
              </p>
              <p className="text-muted">- Jane Smith</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/path-to-customer-image-3.jpg"
              alt="Customer 3"
            />
            <Carousel.Caption>
              <h4>Customer Review 3</h4>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                Sed nisi."
              </p>
              <p className="text-muted">- Alex Johnson</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
};

export default ReviewsSlider;
