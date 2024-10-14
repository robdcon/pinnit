import React from 'react';
import { StyledCard, StyledLink } from './Card.styles';
// import { Link } from 'react-router-dom'

const Card = ({ children, link }) => (
  <StyledLink to={link}>
    <StyledCard className="CardWrapper">
      {children}
    </StyledCard>
  </StyledLink>
);

export default Card;
