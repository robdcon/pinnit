import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <Global 
    styles={rootStyles}
  />
)

var rootStyles = css`
    root: {
        --color-primary: #007bff;
        --color-primary-dark: #0056b3;
        --color-primary-light: #4d94ff;
        --color-secondary: #6c757d;
        --color-secondary-dark: #495057;
        --color-secondary-light: #868e96;
        --color-success: #28a745;
        --color-success-dark: #1e7e34;
        --color-success-light: #34d058;
        --color-danger: #dc3545;
        --color-danger-dark: #bd2130;
        --color-danger-light: #ff4757;
        --color-warning: #ffc107;
        --color-warning-dark: #d39e00;
        --color-warning-light: #ffca28;
        --color-info: #17a2b8;
        --color-info-dark: #117a8b;
        --color-info-light: #2d99b2;
        --spacing-xxs: 0.25rem;
        --spacing-xs: 0.5rem;
        --spacing-sm: 1rem;
        --spacing-md: 1.5rem;
        --spacing-lg: 2rem;
        --spacing-xl: 3rem;
        --spacing-xxl: 4rem;
        --font-size-sm: 0.875rem;
        --font-size-md: 1rem;
        --font-size-lg: 1.25rem;
        --font-size-xl: 1.5rem;
        --font-size-xxl: 2rem;
        --font-size-xxxl: 3rem;
        --font-size-xxxxl: 4rem;
        --font-weight-light: 300;
        --font-weight-normal: 400;
        --font-weight-bold: 700;
        --font-weight-bolder: 800;
        --border-radius-sm: 0.2rem;
        --border-radius-md: 0.4rem;
        --border-radius-lg: 0.6rem;
        --border-radius-xl: 0.8rem;
        --border-radius-xxl: 1rem;
        --border-radius-pill: 50rem;
        --border-width: 1px;
        --border-style: solid;
        --border-color: #dee2e6;
        --border-color-dark: #adb5bd;
        --border-color-light: #e9ecef;
        --border-color-primary: #007bff;
        --border-color-secondary: #6c757d;
        --border-color-success: #28a745;
        --border-color-danger: #dc3545;
        --border-color-warning: #ffc107;
        --border-color-info: #17a2b8;
    }
`