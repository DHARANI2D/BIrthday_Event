import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import NavbarMain from '../components/NavbarComponent';
import FooterMain from '../components/FooterMain';
import Admin from './Admin';

const OverlayComponent = ({ url, handleClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', backgroundColor: 'white', padding: '20px' }}>
        <button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
        <iframe src={url} width="100%" height="calc(100vh - 100px)" title="Edit Page"></iframe>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const initialElements = [
    { id: 1, name: 'Venues', status: 'Available', url: '/VenuePanel' },
    { id: 2, name: 'Decorations', status: 'Available', url: '/decorationpanel' },
    { id: 3, name: 'Photography', status: 'Available', url: '/photographypanel' },
    { id: 4, name: 'Cakes', status: 'Available', url: '/cakepanel' },
    { id: 5, name: 'Entertainment', status: 'Available', url: '/entertainmentpanel' },
    { id: 6, name: 'Return Gifts', status: 'Available', url: '/returngiftpanel' },
    { id: 7, name: 'Food', status: 'Available', url: '/foodpanel' },
    { id: 8, name: 'Order', status: 'Available', url: '/orderpanel' },

  ];

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleOperation = (url) => {
    setSelectedUrl(url);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedUrl('');
  };
  
  const OverlayComponent = ({ url, handleClose }) => {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', backgroundColor: 'white', padding: '20px' }}>
          <button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
          <iframe src={url} width="100%" height="600px" title="Edit Page"></iframe>
        </div>
      </div>
    );
  };
  
  return (
    <Container>
      <NavbarMain />
      <Admin />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialElements.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.status}</td>
              <td>
                <Button variant="warning" onClick={() => handleOperation(element.url)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <FooterMain />
      {showOverlay && <OverlayComponent url={selectedUrl} handleClose={handleCloseOverlay} />}
    </Container>
  );
};

export default AdminPanel;
