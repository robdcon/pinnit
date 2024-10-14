import React, {FC} from 'react';
import { StyledButton } from './Button.styles';

// Define the type for the props
interface ButtonProps {
  text: string;
  action: () => void; // Assuming action is a function with no parameters and no return value
}

const Button: FC<ButtonProps> = ({ text, action }) => (
  <StyledButton className="btn" onClick={action}>
    {text}
  </StyledButton>
);

export default Button;