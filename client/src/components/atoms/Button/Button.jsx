import React from 'react';
import { StyledButton } from './Button.styles';

const Button = ({text, action}) => (
  <StyledButton className="btn" onClick={action}>
    {text}
  </StyledButton>
);

export default Button;
