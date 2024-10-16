import React from 'react';
import logo from './logo.svg';
import { GlobalStyles } from './themes/GlobalStyles';
import { ThemeProvider } from '@emotion/react';
import Theme from './themes/Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
