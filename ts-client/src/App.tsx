import React from 'react';
import logo from './logo.svg';
import { GlobalStyles } from './themes/GlobalStyles';
import { ThemeProvider } from '@emotion/react';
import Theme from './themes/Theme';
import { UserContext } from './context/UserContext';
import { BoardContext } from './context/BoardContext';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BoardContext.Provider value={{ board: {}}}>
        <UserContext.Provider value={{ user: 'robdcon@gmail.com' }}>
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
        </UserContext.Provider>
      </BoardContext.Provider>
    </ThemeProvider >
  );
}

export default App;
