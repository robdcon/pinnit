import React from 'react';
import Board from './components/Board';
import Login from './components/Login/';

const App = () => {
  return (  
      <div className="Pinnit">
        <Login />
        <Board />
      </div>
    );
}

export default App;
