import React, {FC} from 'react';
import { StyledHeader } from './Header.styles';

interface HeaderProps {
  children: React.ReactElement;
}

const Header:FC<HeaderProps> = ({children}) => { 
  return (
    <StyledHeader className="Header">
      {children}
    </StyledHeader>
  )
}

export default Header;
