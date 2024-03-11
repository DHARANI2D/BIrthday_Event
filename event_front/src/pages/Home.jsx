import NavbarComponent from '../components/NavbarComponent';
import CarouselComponent from '../components/CarouselComponent';
import Menubar from '../components/Menubar';
import HitworkItem from '../components/HitworkItem';
import FooterMain from '../components/FooterMain';
import img1 from '../assets/images/calander.png';
import { Link } from 'react-router-dom';
import img2 from '../assets/images/celebrate.png';
import img3 from '../assets/images/quote.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAndStoreUserInfo = async () => {
      const username = Cookies.get('username');
      if (!username) return;
  
      try {
        const token = Cookies.get('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const idResponse = await axios.get(`http://localhost:8181/api/userinfo/id/${username}`, config);
        const userId = idResponse.data;
        const rolesResponse = await axios.get(`http://localhost:8181/api/userinfo/roles/${username}`, config);
        const roles = rolesResponse.data;
        Cookies.set('userId', userId);
        Cookies.set('roles2', JSON.stringify(roles)); // roles is an array, so we need to stringify it
        var rolesString = Cookies.get('roles2'); // Retrieve the cookie value
        var roles1 = JSON.parse(rolesString);
        Cookies.set('roles',roles1[0]);

        // Set isAdmin inside the useEffect hook
        setIsAdmin(roles1[0].includes('ADMIN'));
  
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
  
    fetchAndStoreUserInfo();
  }, []);  

  // Remove the following line as it's unnecessary and causes an error
  // setIsAdmin(roles1[0].includes('ADMIN'));
  
  
  return (
    <div>
      <NavbarComponent />
      <CarouselComponent />
      <Menubar />
      <div className="container mt-4">
        <div className="row">
          <HitworkItem
            imgSrc={img1}
            title="Plan your Event"
            description="Send us your event details and we will plan everything to perfection to your preferences"
            to="/event"
          />
          <HitworkItem
            imgSrc={img2}
            title="Get a Quote"
            description="Get a transparent and comprehensive quote of all anticipated expenses and miscellaneous"
            to="/quote"
          />
          <HitworkItem
            imgSrc={img3}
            title="Celebrate your Events"
            description="Sit back and celebrate your event with loved ones as Homevents takes care of everything else"
            to="/feedback"
          />
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default Home;
