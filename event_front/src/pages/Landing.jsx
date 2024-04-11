import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CaveatFont from '../components/CaveatFont';
import cake from '../assets/images/cake.webp';
import effiency from '../assets/images/effiency.avif';
import excl1 from '../assets/images/excellence.avif';
import perfect from '../assets/images/Perfection.avif';
import time from '../assets/images/time.avif';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/Slider.css';
import Footer from '../components/Footer';
function Landing() {
    const reviews = [
        {
          id: 1,
          text: "Celebria made my birthday truly unforgettable! The personalized themes and activities allowed me to create a celebration that reflected my style. The star-studded touch with a surprise celebrity appearance added an extra layer of excitement. Effortless coordination and seamless engagement features made planning a breeze. Highly recommend!",
          author: "Sarah",
          image: "url-to-john-doe-image.jpg",
        },
        {
          id: 2,
          text:  "Wow! Celebria exceeded my expectations. The app's exclusive celebrity collaboration feature brought my party to life. Coordinating with vendors was a breeze, and the in-app messaging made communication with guests so easy. The budgeting tool was a game-changer. My celebration was a hit, and I owe it all to Celebria!",
          author: "Alex",
          image: "url-to-jane-smith-image.jpg",
        },
        {
            id: 3,
            text: "Thanks to Celebria, my birthday was a dream come true. The personalized experiences allowed me to showcase my creativity. The celebrity collaboration was a showstopper, and the app's timeline management kept everything on track. A stress-free, memorable celebration - Celebria is a must for event planning!",
            author: "Emily",
            image: "url-to-jane-smith-image.jpg",
        },
        {
            id: 4,
            text: "Celebria turned my birthday into a VIP experience! The app's coordination with vendors ensured a seamless process, and the celebrity collaboration added a touch of glamour. The budgeting tool kept me on track financially, and the timeline management feature made planning a joy. Highly recommended for anyone who wants a top-notch celebration!",
            author: "Jane",
            image: "url-to-jane-smith-image.jpg",
        },
      ];
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 10,
        slidesToShow: 2, 
        slidesToScroll: 2, 
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <a className="navbar-brand" href="#"><CaveatFont weight={500} fontSize="2rem">Celebria</CaveatFont></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#features">Features</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#customers">Customers</a>
                </li>
                </ul>
                <a className="btn btn-primary ms-lg-3" href="/login">Login</a>
            </div>
            </div>
        </nav>
        <div className="py-4 text-left">
            <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                <h1 className="display-3"><b>We Plan,You Celebrate</b></h1>
                <p>
        <CaveatFont weight={500} fontSize="1.5rem" style={{ display: 'inline' }}>Celebria </CaveatFont>
         , the pinnacle of event planning apps, promises to elevate your birthday celebrations to new heights. Offering tailored perfection, the app empowers users to create distinctive and memorable events with personalized themes and captivating activities.<br /> With a star-studded touch,
        <CaveatFont weight={500} fontSize="1.5rem" style={{ display: 'inline' }}>Celebria </CaveatFont>
        allows for exclusive celebrity collaborations, adding glamour and excitement to special appearances or performances. The app ensures effortless coordination through its integrated network of trusted vendors, streamlining the planning process from catering to decoration.
      </p>    
                 <button type="button" className="btn btn-success btn-lg"><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Get Started</Link></button>
                </div>
                <div className="col-md-6">
                    <img src={cake} alt="Login Image" className="img-fluid" />
                </div>
            </div>
            </div>
        </div>
        <section id="features" className="py-5 bg-light">
            <div className="container py-5">
            <div className="row">
                <div className="col-md-3">
                <div className="card mb-3">
                    <img src={excl1} alt="Login Image" className="img-fluid" />
                    <div className="card-body">
                    <h5 className="card-title">Engagement Excellence</h5>
                    <p className="card-text">Connect with your guests like never before with Celebria's in-app messaging and digital invitations. </p>
                    </div>
                </div>
                </div>
                <div className="col-md-3">
                <div className="card mb-3">
                    <img src={effiency} alt="Login Image" className="img-fluid" />
                    <div className="card-body">
                    <h5 className="card-title">Effortless Coordination</h5>
                    <p className="card-text">Experience seamless planning through Celebria's integrated network of trusted vendors.</p>
                    </div>
                </div>
                </div>
                <div className="col-md-3">
                <div className="card mb-3">
                    <img src={perfect} alt="Login Image" className="img-fluid" />
                    <div className="card-body">
                    <h5 className="card-title">Tailored Perfection</h5>
                    <p className="card-text">Dive into a realm of personalized experiences as Celebria empowers you to craft a celebration.</p>
                    </div>
                </div>
                </div>
                <div className="col-md-3">
                <div className="card mb-3">
                    <img src={time} alt="Login Image" className="img-fluid" />
                    <div className="card-body">
                    <h5 className="card-title">Timeline Mastery</h5>
                    <p className="card-text">Navigate the planning process stress-free with Celebria's timeline and task management features. </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section id="customers" className="py-5">
            <div className="container py-5">
                <h2 className="text-center mb-4">Happy Customers</h2>
                <Slider {...settings} className="custom-slider">
                {reviews.map((review) => (
                    <div key={review.id} className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-header">
                        <h4 className="card-title">Customer Review</h4>
                        </div>
                        <div className="card-body">
                        <p className="card-text">{review.text}</p>
                        <p className="text-muted">- {review.author}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </Slider>
            </div>
            </section>
            <Footer />
    </div>
  )
}

export default Landing