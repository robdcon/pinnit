import React from 'react';
import PropTypes from 'prop-types';
import { StyledStickyFooter } from './StickyFooter.styles';
import FlexContainer from '../FlexContainer'


const StickyFooter = (props) => (
  <StyledStickyFooter transparent className="StickyFooterWrapper">
    <FlexContainer>
      {props.children}
    </FlexContainer>
  </StyledStickyFooter>
);

StickyFooter.propTypes = {
  // bla: PropTypes.string,
};

StickyFooter.defaultProps = {
  // bla: 'test',
};

export default StickyFooter;
