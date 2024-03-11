import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { MdLocationCity, MdBrush, MdPhotoCamera, MdCake, MdMic, MdCardGiftcard, MdRestaurant } from 'react-icons/md';

const NavItem = ({ icon, label }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const zoomEffect = isHovered ? 'scale(1.2)' : 'scale(1)';

  return (
    <div
      className="text-center nav-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: zoomEffect, transition: 'transform 0.3s ease-in-out' }}
    >
      {icon}
      <div>{label}</div>
    </div>
  );
};

const NavigationBar = () => {
  const navItems = [
    { icon: <MdLocationCity size={45} />, label: 'Venues' },
    { icon: <MdBrush size={45} />, label: 'Decorations' },
    { icon: <MdPhotoCamera size={45} />, label: 'Photography' },
    { icon: <MdCake size={45} />, label: 'Cakes' },
    { icon: <MdMic size={45} />, label: 'Entertainment' },
    { icon: <MdCardGiftcard size={45} />, label: 'Return Gifts' },
    { icon: <MdRestaurant size={45} />, label: 'Food' },
  ];

  return (
    <Navbar bg="light" expand="lg" style={{ height: '100px' }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto d-flex justify-content-around w-100 align-items-center">
          {navItems.map((item, index) => (
            <Nav.Link key={index} href={`/${item.label}`}>
              <NavItem icon={item.icon} label={item.label} />
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
