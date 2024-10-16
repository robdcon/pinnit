import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

// Define the test suite
describe('Button', () => {
  // Define the test
  it('should render the button with the correct text', () => {
    // Arrange
    const text = 'Click me';
    const action = jest.fn();
    // Act
    const { getByText } = render(<Button text={text} action={action} />);
    const button = getByText(text);
    // Assert
    expect(button).toBeInTheDocument();
  });

  // Define the test
  it('should call the action when the button is clicked', () => {
    // Arrange
    const text = 'Click me';
    const action = jest.fn();
    // Act
    const { getByText } = render(<Button text={text} action={action} />);
    const button = getByText(text);
    fireEvent.click(button);
    // Assert
    expect(action).toHaveBeenCalledTimes(1);
  });
});
