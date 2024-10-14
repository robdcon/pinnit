import React from 'react';
import { StyledHeader } from './Header.styles';

const Header = ({children}) => { 
  return (
    <StyledHeader className="Header">
      {children}
    </StyledHeader>
  )
}

export default Header;
