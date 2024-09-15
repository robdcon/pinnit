import React, {useEffect, useState} from 'react';
import Board from './components/Board';
import Note from './components/Note';
import { getBoards, getBoardNotes, getLoggedinUser, getUser } from './api/queries';
import { editNote, deleteNote, createUser } from './api/mutations';
import CreateBoard from './components/CreateBoard/CreateBoard';
import CreateNote from './components/CreateNote/CreateNote';
import ShareBoard from './components/ShareBoard/ShareBoard';
import { useAuth0 } from "@auth0/auth0-react";
import { tokenVar } from './cache';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";

const boardContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
}

const BoardPanel = ({boardId, setCurrentBoard}) => {
  const styles = {
    minHeight: '100px',
    minWidth: '100px',
    border: '1px solid black',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em'
  }
  return (
    <div style={styles}>
     <Link key={boardId} to={`/boards/${boardId}`}>
        {`Board: ${boardId}`}
      </Link>
    </div>
  )
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};


const App = () => {
  // state
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [uid, setUid] = useState(null)
  const [boards, setBoards] = useState();
  // const [notes, setNotes] = useState();
  // const [currentBoard, setCurrentBoard] = useState(null);
  // queries
  // const { getBoardIds, boardLoading, boardData, boardError, startBoardPolling } = getBoards();
  // const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();
  // const { userLoading, userData, userError } = getLoggedinUser();
  const { fetchUser, userLoading, userData, userError } = getUser({email: user?.email});
  
  // Mutations
  // const updateNote = editNote({userId: uid, boardId: currentBoard});
  // const removeNote = deleteNote({userId: uid, boardId: currentBoard});
  // const getUser = getLoggedinUser({email: uid});
  const { getAccessTokenSilently } = useAuth0();
  const addUser = createUser({username: uid, email: uid});
  

  useEffect(() => {
    if(user) {
      const token = getAccessTokenSilently();
      token.then(res => {
        tokenVar(res);
      })
      console.log(`${user.nickname} logged in`);

      if (user.newUser) {
        console.log(`Creating new supabase user`);
        addUser();
      }

      if(!user.newUser) {
        console.log(`Fetching supabase user`);
        fetchUser();
      }
    }
  }, [user])

  useEffect(() => {
    if(userData) {
      console.log(`User set to:`, userData);
      
      // getBoardIds({ 
      //   variables: { user: uid }
      // });
      // console.log(`Get Boards for: ${uid}`);
    }
  }, [userData]);

  // useEffect(() => {
  //   console.log(`Finshed getting Boards for: ${uid}`);
  //   if(boardData) {
  //     const {boards} = boardData;
  //     setBoards(boards);
  //     console.log(`Setting Boards for ${uid}: ${boardData.boards}`);
  //   }
  // }, [boardData]);

  // useEffect(() => {
  //   if(boards) {
  //     console.log(`Finished setting Boards for ${uid}: ${boards}`);
  //   }
  // }, [boards])

  // useEffect(() => {
  //   if(currentBoard) {
  //     getNotes({
  //       variables:{user: uid, board:currentBoard}
  //     });
  //     console.log(`Getting Notes for Board: ${currentBoard}`);
  //   }
  // }, [currentBoard]);

  // useEffect(() => {
  //   if(notesData) {
  //     const {notes} = notesData;
  //     setNotes(notes);
  //     console.log(`Setting Notes: ${notes}`);
  //     // startNotesPolling && startNotesPolling(1000);
  //   }
  // }, [notesData]);

  // useEffect(() => {
  //   if(notes) {
  //     console.log(`Finished setting notes for ${currentBoard}: ${notes}`);
  //   }
  // }, [notes])

  return (  
    <Router>
      <div className="pinnit">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/boards">
            <button>BOARDS</button>
        </Link>
        {
          isAuthenticated && <CreateBoard userId={user?.email} />
        }
        <Route path="/boards" exact>
          <h1>Dashboard</h1>
          <div style={boardContainerStyles}>
            {
              boards && boards.length > 0 && boards.map(board => {
                return (
                  <BoardPanel key={board} boardId={board}/>
                )
              })
            }
          </div>
        </Route>
        <Route path="/boards/:boardId" render={ (url) => {
          setCurrentBoard(url.match.params.boardId);
          return isAuthenticated && (
          <Board boardId={currentBoard} notes={notes} userId={uid}>
          {
            notesData && notesData.notes.map(note => {
              return (
                <Note 
                  key={`${currentBoard}${note.id}`} 
                  id={note.id}
                  zindex={note.zindex}
                  level={note.level}
                  onChange={({field, value}) => updateNote({variables: {user: uid, board: currentBoard, id: note.id, [field]:value}})}
                  onRemove={() => removeNote({variables:{user: uid, board: currentBoard, id: note.id}})}
                  // onPriorityChange={updatePriority}
                  >
                    { note.text }
                </Note>
              )
            })
          }
            <div>
              {
                isAuthenticated && <CreateNote boardId={currentBoard} userId={uid} />
              }
              {/* {
                usersData && usersData.users.map(user =>{ return(<ShareBoard key={user.username} boardId={currentBoard} username={user.username} text={user.username} />)})
              } */}
            </div>
          </Board>)
          } 
        }/>
        <Route path="/" exact>
          <h1>Home Screen</h1>
            
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}

        </Route>
      </div>
    </Router>
    );
}

export default App;
