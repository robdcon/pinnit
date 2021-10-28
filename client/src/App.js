import React, {useEffect, useState} from 'react';
import Board from './components/Board';
import Note from './components/Note';
import { getBoards, getBoardNotes, getLoggedinUser } from './api/queries';
import { editNote, deleteNote } from './api/mutations';
import CreateBoard from './components/CreateBoard/CreateBoard';
import CreateNote from './components/CreateNote/CreateNote';
import ShareBoard from './components/ShareBoard/ShareBoard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";

const BoardPanel = ({boardId}) => {
  const styles = {
    height: '100px',
    width: '100px',
    border: '1px solid black',
    display: 'flex'
  }
  return (
    <div style={styles}>
     <Link key={boardId} to={`/boards/${boardId}`} onClick={() => setCurrentBoard(boardId)}>
        {`Board: ${board}`}
      </Link>
    </div>
  )
}


const App = () => {
  // state
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState();
  const [notes, setNotes] = useState();
  const [currentBoard, setCurrentBoard] = useState(null);
  // queries
  const {getBoardIds, boardLoading, boardData, boardError, startBoardPolling} = getBoards();
  const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();
  // Mutations
  const updateNote = editNote({userId: user, boardId: currentBoard});
  const removeNote = deleteNote({userId: user, boardId: currentBoard});
  const {userLoading, userData, userError} = getLoggedinUser();

   // Get logged in user
  useEffect(() => {
    if(userData) {
      console.log(userData)
      setUser(userData.user);
    }
  }, [userData])

  useEffect(() => {
    if(user) {
      getBoardIds({ 
        variables: {user}
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
    if(currentBoard && user) {
      getNotes({
        variables:{user, board:currentBoard}
      });
    }
  }, [currentBoard]);

  useEffect(() => {
    if(notesData) {
      const {notes} = notesData;
      setNotes(notes);
      // startNotesPolling && startNotesPolling(1000);
    }
  }, [notesData, startNotesPolling])

  return (  
    <Router>
      <div className="pinnit">
        <nav>
        {
          boards && boards.length > 0 && boards.map(board => {
            return (
              <Link key={board} to={`/boards/${board}`} onClick={() => setCurrentBoard(board)}>
                {board}
              </Link>
            )
          })
        }
        </nav>
        <div>
        {
          user && <CreateBoard userId={user} />
        }
        {
          user && <CreateNote boardId={currentBoard} userId={user} />
        }
        {/* {
          usersData && usersData.users.map(user =>{ return(<ShareBoard key={user.username} boardId={currentBoard} username={user.username} text={user.username} />)})
        } */}
        </div>
        <Route path="/boards/:boardId" render={ (url) => {
          setCurrentBoard(url.match.params.boardId);
          return user && (
          <Board boardId={currentBoard} notes={notes} userId={user}>
          {
            notesData && notesData.notes.map(note => {
              return (
                <Note 
                  key={`${currentBoard}${note.id}`} 
                  id={note.id}
                  zindex={note.zindex}
                  level={note.level}
                  onChange={({field, value}) => updateNote({variables: {id: note.id, [field]:value}})}
                  onRemove={() => removeNote({variables:{id: note.id}})}
                  // onPriorityChange={updatePriority}
                  >
                    { note.text }
                </Note>
              )
            })
          }
          </Board>)
          } 
        }/>
        <Route path="/">
          <h1>Welcome</h1>
        </Route>
      </div>
    </Router>
    );
}

export default App;
