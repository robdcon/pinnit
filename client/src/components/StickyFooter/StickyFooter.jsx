import React from 'react';
import { StyledStickyFooter } from './StickyFooter.styles';
import FlexContainer from '../layout/FlexContainer'


const StickyFooter = ({children}) => (
  <StyledStickyFooter transparent className="StickyFooterWrapper">
    <FlexContainer>
      {children}
    </FlexContainer>
  </StyledStickyFooter>
);

export default StickyFooter;
