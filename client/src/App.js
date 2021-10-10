import React, {useEffect, useState} from 'react';
import Board from './components/Board';
import Login from './components/Login/';
import Register from './components/Register';
import { getBoards, getBoardNotes, getUsers } from './api/queries';
import CreateBoard from './components/CreateBoard/CreateBoard';
import CreateNote from './components/CreateNote/CreateNote';
import ShareBoard from './components/ShareBoard/ShareBoard';
import { boardsVar, currentBoardVar } from './cache';
import { useReactiveVar } from '@apollo/client';

const contacts = [
  {email: 'robdcon2@gmail.com', id:"1"}
]

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";


const App = () => {
  // state
  const [user, setUser] = useState();
  const [boards, setBoards] = useState();
  const [notes, setNotes] = useState();
  const [currentBoard, setCurrentBoard] = useState();
  const [allUsers, setAllUsers] = useState([]);
  // queries
  const {getBoardIds, boardLoading, boardData, boardError, startBoardPolling} = getBoards();
  const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();
  const {usersLoading, usersData, usersError} = getUsers()

  // const currentBoard = useReactiveVar(currentBoardVar);

   // Get logged in user
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, [])

  useEffect(() => {
    console.log({usersLoading, usersData, usersError})
  }, [usersLoading, usersData, usersError])
 
  useEffect(() => {
    if(user) {
      getBoardIds({ 
        variables: {user:user.id}
      });
    }
  }, [user]);

  useEffect(() => {
    
    if(boardData) {
      const {boards} = boardData;
      setBoards(boards);
      // startBoardPolling && startBoardPolling(1000);
    }
  }, [boardLoading, boardData, boardError, startBoardPolling]);

  useEffect(() => {
    if(currentBoard) {
      getNotes({
        variables:{user: user.id, board:currentBoard}
      });
    }
  }, [currentBoard]);

  useEffect(() => {
    if(notesData) {
      const {notes} = notesData;
      setNotes(notes);
      startNotesPolling && startNotesPolling(1000);
    }
  }, [notesData, startNotesPolling])

  return (  
    <Router>
      <div className="pinnit">
        <nav>
        {
          boards && boards.length > 0 && boards.map(board => {
            return (
              <Link key={board} to={`/${board}`} onClick={() => setCurrentBoard(board)}>
                {board}
              </Link>
            )
          })
        }
        </nav>
        <div>
        {
          user && <CreateBoard userId={user.id} />
        }
        {
          user && <CreateNote boardId={currentBoard} userId={user.id} />
        }
        {
          usersData && usersData.users.map(user =>{ return(<ShareBoard key={user.username} boardId={currentBoard} username={user.username} text={user.username} />)})
        }
        </div>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/:boardId" render={ (url) => {
          setCurrentBoard(url.match.params.boardId);
          return user && <Board boardId={currentBoard} notes={notes} userId={user.id}/>
          } 
        }/>
        <Route path="/">
          {
            (!user) && <Register />
          }
          <h1>Welcome</h1>
        </Route>
      </div>
    </Router>
    );
}

export default App;
