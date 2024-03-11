import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cake from '/Users/dharanidharansenthilkumar/Projects/event_management/FRONTEND/event_front/src/assets/images/cake.gif'
import ReturnGifts from './pages/ReturnGifts';
import Photography from './pages/Photography';
import Food from './pages/Food';
import Entertainment from './pages/Entertainment';
import Decoration from './pages/Decorations';
import VenuePanel from './pages/VenuePanel';
import DecorationPanel from './pages/DecorationPanel';
import PhotographyPanel from './pages/PhotographyPanel';
import FoodPanel from './pages/FoodPanel';
import CakePanel from './pages/CakePanel';
import EntertainmentPanel from './pages/EntertainmentPanel';
import ReturnGiftPanel from './pages/ReturnGiftPanel';
import Cakes from './pages/Cakes';
import OrderPanel from './pages/OrderPanel';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Landing = lazy(() => import('./pages/Landing'));
const Home = lazy(() => import('./pages/Home'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Event = lazy(() => import('./pages/EventPage'));
const Quote = lazy(() => import('./pages/Quote'));
const AdminPage = lazy(() => import('./pages/AdminPanel'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const Checkout = lazy(() => import('./pages/Cart'));
const Venue =lazy(() => import('./pages/Venues'));

const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <img
        src={Cake}  
        style={{ width: '400px', height: '400px' }} 
      />
    </div>
  );
};

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <div className="container-fluid">
        {isLoading && <LoadingOverlay />}
        <Routes>
          <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Landing /></Suspense>} />
          <Route path="/home" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
          <Route path="/user" element={<Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>} />
          <Route path="/event" element={<Suspense fallback={<div>Loading...</div>}><Event /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<div>Loading...</div>}><AdminPage /></Suspense>} />
          <Route path="/quote" element={<Suspense fallback={<div>Loading...</div>}><Quote /></Suspense>} />
          <Route path="/feedback" element={<Suspense fallback={<div>Loading...</div>}><FeedbackPage /></Suspense>} />
          <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Checkout /></Suspense>} />
          <Route path="/Venues" element={<Suspense fallback={<div>Loading...</div>}><Venue /></Suspense>} />
          <Route path="/Return Gifts" element={<Suspense fallback={<div>Loading...</div>}><ReturnGifts /></Suspense>} />
          <Route path="/Photography" element={<Suspense fallback={<div>Loading...</div>}><Photography /></Suspense>} />
          <Route path="/Food" element={<Suspense fallback={<div>Loading...</div>}><Food /></Suspense>} />
          <Route path="/Entertainment" element={<Suspense fallback={<div>Loading...</div>}><Entertainment /></Suspense>} />
          <Route path="/Cakes" element={<Suspense fallback={<div>Loading...</div>}><Cakes /></Suspense>} />
          <Route path="/Decorations" element={<Suspense fallback={<div>Loading...</div>}><Decoration /></Suspense>} />
          <Route path="/venuepanel" element={<Suspense fallback={<div>Loading...</div>}><VenuePanel /></Suspense>} />
          <Route path="/decorationpanel" element={<Suspense fallback={<div>Loading...</div>}><DecorationPanel /></Suspense>} />
          <Route path='/photographypanel' element={<Suspense fallback={<div>Loading...</div>}><PhotographyPanel /></Suspense>} />
          <Route path='/foodpanel' element={<Suspense fallback={<div>Loading...</div>}><FoodPanel /></Suspense>} />
          <Route path='/orderpanel' element={<Suspense fallback={<div>Loading...</div>}><OrderPanel /></Suspense>} />
          <Route path='/cakepanel' element={<Suspense fallback={<div>Loading...</div>}><CakePanel /></Suspense>} />
          <Route path='/entertainmentpanel' element={<Suspense fallback={<div>Loading...</div>}><EntertainmentPanel /></Suspense>} />
          <Route path='/returngiftpanel' element={<Suspense fallback={<div>Loading...</div>}><ReturnGiftPanel /></Suspense>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
