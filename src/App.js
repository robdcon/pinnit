import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Note from "./containers/Note"
import Board from "./containers/Board"

class App extends Component {
  render() {
    return (
      <div className="App">
       <Board />
      </div>
    );
  }
}

export default App;
