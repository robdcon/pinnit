import React, { useState, useEffect } from 'react';
import Note from "./components/Note"
import Board from "./components/Board"

const App = () => {
  const [data, setData] = useState({notes:[{message:'note one'}]});

  useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setData(data));
  }, []);

  return(
    <div className="Pinnit">
      <Board />
    </div>
  )
}

export default App;
