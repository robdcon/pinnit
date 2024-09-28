import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Note from './components/Note';
import { getBoard, getBoards, getBoardNotes, getLoggedinUser, getUser } from './api/queries';
import { editNote, deleteNote, createUser } from './api/mutations';
import CreateBoard from './components/CreateBoard/CreateBoard';
import CreateNote from './components/CreateNote/CreateNote';
import ShareBoard from './components/ShareBoard/ShareBoard';
import { useAuth0 } from "@auth0/auth0-react";
import { tokenVar } from './cache';
import { createContext, useContext } from 'react';

export const BoardContext = createContext(null);

<BoardContext.Provider value={null}>

</BoardContext.Provider>

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useHistory,
  useParams,
  useLocation
} from "react-router-dom";

const boardContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
}

const BoardPanel = ({ boardId, setCurrentBoard }) => {
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

const HomeScreen = ({isAuthenticated}) => {
  return (
    <React.Fragment>
      <h1>Home Screen</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </React.Fragment>
  )
}

const Dashboard = ({ boards }) => {
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <div style={boardContainerStyles}>
        {
          boards && boards.length > 0 && boards.map(board => {
            return (
              <BoardPanel key={board} boardId={board} />
            )
          })
        }
      </div>
    </React.Fragment>
  )
}


const App = () => {
  // state
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [uid, setUid] = useState(null)
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [board, setBoard] = useState({});
  const [notes, setNotes] = useState([]);

  // queries
  const { fetchUser, userLoading, userData, userError } = getUser({ email: user?.email });
  const { getBoardIds, boardIdsLoading, boardIdsData, boardIdsError, startBoardIdsPolling } = getBoards();
  const { fetchBoard, boardLoading, boardData, boardError, startBoardPolling } = getBoard();
  const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();

  // Mutations
  // const updateNote = editNote({userId: uid, boardId: currentBoard});
  // const removeNote = deleteNote({userId: uid, boardId: currentBoard});
  // const getUser = getLoggedinUser({email: uid});
  const { getAccessTokenSilently } = useAuth0();
  const addUser = createUser({ username: uid, email: uid });

  useEffect(() => {
    if (user) {
      const token = getAccessTokenSilently();
      token.then(res => {
        tokenVar(res);
      })
      console.log(`${user.nickname} logged in`);

      if (user.newUser) {
        console.log(`Creating new supabase user`);
        addUser();
      }

      if (!user.newUser) {
        console.log(`Fetching supabase user`);
        fetchUser();
      }
    }
  }, [user])

  useEffect(() => {
    if (userData) {
      console.log('Setting UID to:', userData.user.email);

      setUid(userData.user.email);
    }
  }, [userData]);

  useEffect(() => {
    if (uid) {
      getBoardIds({
        variables: { user: uid }
      });
      console.log(`Get Boards for: ${uid}`);
    }
  }, [uid]);

  useEffect(() => {
    if (boardIdsData) {
      console.log(`Finished getting Boards for: ${uid}`);
      const { boards } = boardIdsData;
      setBoards(boards);
      console.log(`Setting Boards for ${uid}: ${boardIdsData.boards}`);
    }
  }, [boardIdsData]);

  useEffect(() => {
    if (currentBoard) {
      console.log('Current Board:', currentBoard);

      getNotes({ variables: { board: currentBoard } });
      fetchBoard({ variables: { board: currentBoard } });

      console.log(`Getting Notes for Board: ${currentBoard}`);
    }
  }, [currentBoard]);

  useEffect(() => {
    if (boardData) {
      const { board } = boardData;
      console.log('Board Data:', board);

      setBoard(board);
      console.log(`Current Board Details: ${board}`);
      // startNotesPolling && startNotesPolling(1000);
    }
  }, [boardData]);

  useEffect(() => {
    if (board) {
      console.log(`Finished setting board ${board}`);
    }
  }, [board])

  useEffect(() => {
    if (notesData) {
      const { notes } = notesData;
      setNotes(notes);
      console.log(`Setting Notes: ${notes}`);
      // startNotesPolling && startNotesPolling(1000);
    }
  }, [notesData]);



  useEffect(() => {
    if (notes) {
      console.log(`Finished setting notes for ${currentBoard}: ${notes}`);
    }
  }, [notes])

  return (
    <Routes>
      {/* <div className="pinnit">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/boards">
          <button>BOARDS</button>
        </Link>
        {
          isAuthenticated && <CreateBoard userId={uid} />
        } */}
      <Route path="/boards" exact element={<Dashboard board={boards} />} />
      <Route path="/boards/:boardId" render={(url) => {
        setCurrentBoard(parseInt(url.match.params.boardId));
        return isAuthenticated && (
          <BoardContext.Provider value={{ board: currentBoard }}>
            <Board boardId={currentBoard} notes={notes} userId={uid} boardType={board.board_type}>
              {
                notes && notes.map(note => {
                  return (
                    <Note
                      key={`${currentBoard}${note.id}`}
                      id={note.id}
                      zindex={note.zindex}
                      level={note.level}
                      onChange={({ field, value }) => updateNote({ variables: { user: uid, board: currentBoard, id: note.id, [field]: value } })}
                      onRemove={() => removeNote({ variables: { user: uid, board: currentBoard, id: note.id } })}
                    // onPriorityChange={updatePriority}
                    >
                      {note.text}
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
            </Board>
          </BoardContext.Provider>
        )
      }
      } />
      <Route path="/" exact element={<HomeScreen isAuthenticated />} />
      {/* </div> */}
    </Routes>
  );
}

export default App;
