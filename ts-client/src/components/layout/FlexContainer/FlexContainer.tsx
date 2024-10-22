import React, {FC} from 'react';
import PropTypes from 'prop-types';
import { StyledFlexContainer } from './FlexContainer.styles';

interface FlexContainerProps {
  justify: string
  align: string
  direction: string
  children: React.ReactElement
}

const FlexContainer: FC<FlexContainerProps> = ({justify, align, direction, children}) => (
  <StyledFlexContainer direction={direction} justify={justify} align={align} className="FlexContainerWrapper">
    {children}
  </StyledFlexContainer>
);

export default FlexContainer;
