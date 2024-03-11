import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CaveatFont from '../components/CaveatFont';
import { Link } from 'react-router-dom';
import { MdPerson } from 'react-icons/md'; // Import icon from Material Design Icons
import Cookies from 'js-cookie';

function NavbarComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = Cookies.get('roles'); // Retrieve user role from cookies
  const role = Array.isArray(userRole) ? userRole[0] : userRole;

  console.log("oo->",role);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('role');
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/home">
            <CaveatFont weight={500} fontSize="2rem">
              Celebria
            </CaveatFont>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto align-items-center">
            <Form onSubmit={handleSearch} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>

            <NavDropdown title={<MdPerson />} id="basic-nav-dropdown" drop="down">
              {role === 'USER' && (
                <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
              )}
              {role === 'ADMIN' && (
                <NavDropdown.Item href="/admin">Admin Profile</NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
