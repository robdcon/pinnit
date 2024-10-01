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
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const boardContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
}

const BoardPanel = ({ boardId }) => {
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

const HomeScreen = () => {
  return (
    <>
      <h1>Home Screen</h1>
    </>
  )
}

const Dashboard = ({ boards }) => {
  console.log(boards);

  return (
    <>
      <h1>Dashboard</h1>
      <div style={boardContainerStyles}>
        {
          boards && boards.length > 0 && boards.map(board => {
            console.log(board);

            return (
              <BoardPanel key={board} boardId={board} />
            )
          })
        }
      </div>
    </>
  )
}

const Layout = ({ children, isAuthenticated }) => {
  return (
    <div className="pinnit">
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/boards">
        <button>BOARDS</button>
      </Link>
      {
        isAuthenticated && <CreateBoard userId={useAuth0?.user?.email} />
      }
      <LogoutButton />
      <LoginButton />
      {children}
    </div>
  )
}

const Boards = () => {

  const [notes, setNotes] = useState([]);
  const [board, setBoard] = useState({});
  const {user, isAuthenticated} = useAuth0();
  console.log('Board User Details', user);
  
  const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();
  const { fetchBoard, boardLoading, boardData, boardError, startBoardPolling } = getBoard();

  let {boardId} = useParams();
  boardId = parseInt(boardId);

  useEffect(() => {
      getNotes({ variables: { board: boardId } });
      fetchBoard({ variables: { board: boardId } });
  },[]);

  useEffect(() => {
    if (notesData) {
      const { notes } = notesData;
      setNotes(notes);
      console.log(`Setting Notes: ${notes}`);
      // startNotesPolling && startNotesPolling(1000);
    }
  }, [notesData]);

  useEffect(() => {
    if (boardData) {
      const { board } = boardData;
      console.log('Board Data:', board);

      setBoard(board);
      console.log(`Current Board Details: ${board}`);
      // startNotesPolling && startNotesPolling(1000);
    }
  }, [boardData]);
  console.log('Current Board:', boardId);
  return isAuthenticated && (
    <BoardContext.Provider value={{ board: boardId }}>
      <Board boardId={boardId} notes={notes} userId={user.email} boardType={board.board_type}>
        {
          notes && notes.map(note => {
            return (
              <Note
                key={`${boardId}${note.id}`}
                id={note.id}
                zindex={note.zindex}
                level={note.level}
                onChange={({ field, value }) => updateNote({ variables: { user: user.email, board: boardId, id: note.id, [field]: value } })}
                onRemove={() => removeNote({ variables: { user: user.email, board: boardId, id: note.id } })}
              // onPriorityChange={updatePriority}
              >
                {note.text}
              </Note>
            )
          })
        }
        <div>
          {
            console.log('Authenticated:', isAuthenticated)
            
          }
          {
            isAuthenticated && <CreateNote boardId={boardId} userId={user.email} />
          }
          {/* {
            usersData && usersData.users.map(user =>{ return(<ShareBoard key={user.username} boardId={currentBoard} username={user.username} text={user.username} />)})
          } */}
        </div>
      </Board>
    </BoardContext.Provider>
  )
}


const App = () => {
  // state
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [board, setBoard] = useState({});
  const [notes, setNotes] = useState([]);

  // queries
  const { fetchUser, userLoading, userData, userError } = getUser({ email: user?.email });
  const { getBoardIds, boardIdsLoading, boardIdsData, boardIdsError, startBoardIdsPolling } = getBoards();
  
  

  // Mutations
  // const updateNote = editNote({userId: user.email, boardId: currentBoard});
  // const removeNote = deleteNote({userId: user.email, boardId: currentBoard});
  // const getUser = getLoggedinUser({email: user.email});
  const { getAccessTokenSilently } = useAuth0();
  const addUser = createUser({ username: user?.email, email: user?.email });

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

      getBoardIds({
        variables: { user: user.email }
      });
    }
  }, [user])

  // useEffect(() => {
  //   if (userData) {
  //     console.log('Setting user.email to:', userData.user.email);

  //     setuser.email(userData.user.email);
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   if (user.email) {
  //     getBoardIds({
  //       variables: { user: user.email }
  //     });
  //     console.log(`Get Boards for: ${user.email}`);
  //   }
  // }, [user.email]);

  useEffect(() => {
    if (boardIdsData) {
      console.log(`Finished getting Boards for: ${user.nickname}`);
      const { boards } = boardIdsData;
      setBoards(boards);
    }
  }, [boardIdsData]);

  // useEffect(() => {
  //   if (board) {
  //     console.log(`Finished setting board ${board}`);
  //   }
  // }, [board])

  // useEffect(() => {
  //   if (notesData) {
  //     const { notes } = notesData;
  //     setNotes(notes);
  //     console.log(`Setting Notes: ${notes}`);
  //     // startNotesPolling && startNotesPolling(1000);
  //   }
  // }, [notesData]);



  // useEffect(() => {
  //   if (notes) {
  //     console.log(`Finished setting notes for ${currentBoard}: ${notes}`);
  //   }
  // }, [notes])

  return (

    <Layout isAuthenticated={isAuthenticated}>
      <Routes>
        <Route path="/boards" exact element={<Dashboard boards={boards} />} />
        <Route 
          path="/boards/:boardId" 
          element={<Boards /> } 
          action={({ params, request }) => {
            console.log('Params', params);
          }}
        />
        <Route path="/" exact element={<HomeScreen />} />
        {/* </div> */}
      </Routes>
    </Layout>
  );
}

export default App;
