import React from 'react';
import { StyledLayout } from './Layout.styles';

const Layout = ({children}) => (
  <StyledLayout className="LayoutWrapper">
    {children}
  </StyledLayout>
);

export default Layout;
