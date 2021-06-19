import React, { Component } from 'react';
import Note from "./components/Note"
import Board from "./components/Board"


class App extends Component 
{
  render() 
  {
    return (
      <div className="Pinnit">
        <Board />
      </div>
    );
  }
}

export default App;
