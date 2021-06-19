import React from 'react';
import PropTypes from 'prop-types';
import { StyledFlexContainer } from './FlexContainer.styles';

const FlexContainer = (props) => (
  <StyledFlexContainer justify={props.justify} align={props.align} className="FlexContainerWrapper">
   {props.children}
  </StyledFlexContainer>
);

FlexContainer.propTypes = {
  // bla: PropTypes.string,
};

FlexContainer.defaultProps = {
  // bla: 'test',
};

export default FlexContainer;
