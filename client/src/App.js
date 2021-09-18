import React, {useEffect, useState} from 'react';
import Board from './components/Board';
import Login from './components/Login/';
import Register from './components/Register';
import { UserContextProvider } from './context/auth';
import { getUser } from './utils/helpers';
import { getBoards } from './api/queries'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const user = getUser();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("1000");
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(1);
  const {boardLoading, boardData, boardError} = getBoards();

  useEffect(() => {
    boardData && setBoards(boardData)
    console.log(boards.boards)
  }, [boardData])

  return (  
    <Router>
      <UserContextProvider value={{user:loggedInUser, loginUser: (user) => {setLoggedInUser(user)}}} >
        <div className="pinnit">
          <nav>
            {
              
              boards && boards.boards.length > 0 && boards.boards.map(board => {
                return (
                  <Link key={board} to={`/${board}`} onClick={() => setCurrentBoard(board)}>
                    {board}
                  </Link>
                )
              })
            }
          </nav>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/:boardId">
            <Board id={currentBoard} />
          </Route>
          <Route path="/">
            <Board id={currentBoard}/>
          </Route>
        </div>
      </UserContextProvider>
    </Router>
    );
}

export default App;
