import React from 'react';
import { StyledStickyFooter } from './StickyFooter.styles';
import FlexContainer from '../layout/FlexContainer'


const StickyFooter = ({justify, children}) => (
  <StyledStickyFooter transparent={'true'} className="StickyFooterWrapper">
    <FlexContainer justify={justify}>
      {children}
    </FlexContainer>
  </StyledStickyFooter>
);

export default StickyFooter;
