import React from 'react';
import Board from "./components/Board";
import { NotesProvider } from './context/notesContext';
import { GraphQlProvider } from './context/apiContext';

const App = () => {
  return (  
    <GraphQlProvider>
      <NotesProvider>
        <div className="Pinnit">
          <Board />
        </div>
      </NotesProvider>
    </GraphQlProvider>
    );
}

export default App;
