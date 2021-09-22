import React, {useEffect, useState} from 'react';
import Board from './components/Board';
import Login from './components/Login/';
import Register from './components/Register';
import { getBoards } from './api/queries';
import CreateBoard from './components/CreateBoard/CreateBoard';
import { boardsVar, currentBoardVar } from './cache';
import { useReactiveVar } from '@apollo/client';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_BOARDS } from './graphql/queries';

const App = () => {
  const history = useHistory();
  const [user, setUser] = useState(null)
  const [boards, setBoards] = useState(null);
  // const [currentBoard, setCurrentBoard] = useState(null);
  const {getBoardIds, boardLoading, boardData, boardError} = getBoards();
  // const currentBoard = useReactiveVar(currentBoardVar);
 
  

   // Get logged in user
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, [])
 
  useEffect(() => {
    if(user && user.id) {
      getBoardIds({ 
        variables: {user:user.id}
      });
    }
  }, [user]);

  useEffect(() => {
    if(boardLoading) {
      console.log('Loading...');
    }
    if(boardData) {
      const {boards} = boardData;
      console.log(boardData);
      // boardsVar(boardData);
      setBoards(boards);
    }
    if(boardError) {
      console.log('Error:', boardError);
    }
  }, [boardLoading, boardData, boardError]);

  // useEffect(() => {
  //   if(currentBoard !== undefined) {
  //     history.push(`/${currentBoard}`)
  //   }
  // }, [currentBoard]);

  return (  
    <Router>
      <div className="pinnit">
        <nav>
        {
          boards && boards.length > 0 && boards.map(board => {
            return (
              <Link key={board} to={`/${board}`} onClick={() => currentBoardVar(board)}>
                {board}
              </Link>
            )
          })
        }
        </nav>
        <div>
          <CreateBoard userId={user ? user.id : null} />
        </div>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/:boardId">
          <Board />
        </Route>
        <Route path="/">
          {
            (!user) && <Register />
          }
          <Board />
        </Route>
      </div>
    </Router>
    );
}

export default App;
