import React, {FC} from 'react';
import { StyledCard, StyledLink } from './Card.styles';
// import { Link } from 'react-router-dom'
interface CardProps {
  children: React.ReactNode;
  link: string;
}

const Card: FC<CardProps> = ({ children, link }) => (
  <StyledLink to={link}>
    <StyledCard className="CardWrapper">
      {children}
    </StyledCard>
  </StyledLink>
);

export default Card;
