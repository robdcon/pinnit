import React from 'react';
import { StyledFlexContainer } from './FlexContainer.styles';

const FlexContainer = (props) => (
  <StyledFlexContainer justify={props.justify} align={props.align} className="FlexContainerWrapper">
   {props.children}
  </StyledFlexContainer>
);

export default FlexContainer;
