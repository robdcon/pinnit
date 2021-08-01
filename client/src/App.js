import React from 'react';
import Board from "./components/Board";
import { NotesProvider } from './context/notesContext';

const App = () => {
  return (  
      <NotesProvider>
        <div className="Pinnit">
          <Board />
        </div>
      </NotesProvider>
    );
}

export default App;
