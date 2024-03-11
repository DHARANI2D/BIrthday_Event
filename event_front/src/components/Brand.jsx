import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

// Styled component for Caveat font
const CaveatFont = styled.div`
  font-family: "Caveat", cursive;
  font-optical-sizing: auto;
  font-weight: ${(props) => props.weight || 400};
  font-style: normal;
  font-size: ${(props) => props.fontSize || '1rem'};
`;

const Brand = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <CaveatFont weight={500} fontSize="2rem">Celebria</CaveatFont>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Brand;
