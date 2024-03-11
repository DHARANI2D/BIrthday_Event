import styled from 'styled-components';

const CaveatFont = styled.a`
  font-family: "Caveat", cursive;
  font-optical-sizing: auto;
  font-weight: ${(props) => props.weight || 400};
  font-style: normal;
  font-size: ${(props) => props.fontSize || '1rem'};
  color: ${(props) => props.color || 'black'};
  text-decoration: none;
  cursor: pointer; /* Add this to make it look clickable */

  &:hover {
    /* Add styles for hover state, e.g., change color */
    color: ${(props) => props.hoverColor || 'blue'};
  }
`;

export default CaveatFont;
