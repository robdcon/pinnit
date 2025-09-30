import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import { getBoard, getBoards, getBoardNotes, getUser } from './api/queries';
import { createUser, addNote } from './api/mutations';
import { useAuth0 } from "@auth0/auth0-react";
import { tokenVar } from './cache';
import { createContext, useContext } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import StickyFooter from './components/StickyFooter';
import TabIcon from '@mui/icons-material/Tab';
import Layout from './components/layout/Layout/Layout';
import Dashboard from './components/layout/Dashboard/Dashboard';
import Header from './components/organisms/Header/Header';
import Button from './components/atoms/Button/Button';
import MenuToggle from './components/atoms/MenuToggle/MenuToggle';
import { GlobalStyles } from "./themes/global-styles";


export const BoardContext = createContext(null);

<BoardContext.Provider value={null} />

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  Link
} from "react-router-dom";
import Image from './components/atoms/Image/Image';

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

const Boards = () => {
  const [notes, setNotes] = useState([]);
  const [board, setBoard] = useState({});
  const [items, setItems] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  
  let { boardId } = useParams();
  boardId = parseInt(boardId);
  const { fetchBoard, boardLoading, boardData, boardError, startBoardPolling } = getBoard(boardId);

  const createNote = addNote({boardId});

  useEffect(() => {
    if(boardId) {
      fetchBoard();
    }
  }, []);

  useEffect(() => {
    if (boardData) {
      const { board } = boardData;
      setBoard(board);
    }
  }, [boardData]);

  return isAuthenticated && (
    <BoardContext.Provider value={{ board: boardId, boardType: board.board_type, boardName: board.name, user: user.email }}>
      <Board boardId={boardId} items={notes} userId={user.email} boardType={board.board_type} name={board.name} />
      {/* <StickyFooter justify={'space-between'}>
        <TabIcon
          color='primary'
          style={{ color: '#ffffff', fontSize: '3em', cursor: 'pointer' }}
          onClick={() => createBoard({ variables: { text: "New Message", level: 'MED' } })}
          aria-label="add board"
          size="medium"
        />
        <Link to='/'>
          <HomeIcon 
            style={{ color: '#ffffff', fontSize: '3em', cursor: 'pointer' }}
          />
        </Link>
        <AddCircleIcon
          color='primary'
          style={{ color: '#ffffff', fontSize: '3em', cursor: 'pointer' }}
          onClick={() => createNote({ variables: { level: 'MED', boardId: board } })}
          aria-label="add note"
          size="medium"
        />
      </StickyFooter> */}
    </BoardContext.Provider>
  )
}


const App = () => {
  // state
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
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

      if (user.newUser) {
        addUser();
      }

      if (!user.newUser) {
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
      <GlobalStyles />
      <Header>
        <MenuToggle />
        {/* {
          isAuthenticated && <h1>{user.given_name}'s Board</h1>
        } */}
        {
          isAuthenticated ? <Image width='48' height='48' src={user.picture} /> : <Button text={`Login`} action={loginWithRedirect} />
        }
      </Header>
      <Routes>
        <Route path="/" exact element={<Dashboard boards={boards} />} />
        <Route path="/boards" exact element={<Dashboard boards={boards} />} />
        <Route
          path="/boards/:boardId"
          element={<Boards />}
          action={({ params, request }) => {
            console.log('Params', params);
          }}
        />
      </Routes>
    </Layout>
  );
}

export default App;
