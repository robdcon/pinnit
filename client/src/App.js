import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import Note from './components/organisms/Note';
import { getBoard, getBoards, getBoardNotes, getUser } from './api/queries';
import { editNote, deleteNote, createUser, addNote } from './api/mutations';
import CreateBoard from './components/CreateBoard/CreateBoard';
import CreateNote from './components/CreateNote/CreateNote';
import ShareBoard from './components/ShareBoard/ShareBoard';
import { useAuth0 } from "@auth0/auth0-react";
import { tokenVar } from './cache';
import { createContext, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import StickyFooter from './components/StickyFooter';
import TabIcon from '@mui/icons-material/Tab';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import Layout from './components/layout/Layout/Layout';
import Dashboard from './components/layout/Dashboard/Dashboard';
import Header from './components/organisms/Header/Header';
import Button from './components/atoms/Button/Button';
import MenuToggle from './components/atoms/MenuToggle/MenuToggle';
import { GlobalStyles } from "./themes/global-styles";


export const BoardContext = createContext(null);

<BoardContext.Provider value={null}>

</BoardContext.Provider>

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

const HomeScreen = () => {
  return (
    <>
      <h1>Home Screen</h1>
    </>
  )
}

// const Layout = ({ children, isAuthenticated }) => {
//   const [open, setOpen] = useState('false')
//   const toggleDrawer = (anchor, open) =>
//       (event) => {
//         if (
//           event.type === 'keydown' &&
//           ((event).key === 'Tab' ||
//             (event).key === 'Shift')
//         ) {
//           return;
//         }

//         setOpen(!open);
//       };
//   return (
//     <div className="pinnit">
//       {children}
//       <React.Fragment>
//         <Button onClick={toggleDrawer('bottom', true)}>{"MENU"}</Button>
//         <Drawer
//           anchor={'bottom'}
//           open={open}
//           onClose={toggleDrawer('bottom', false)}
//         >

//           <Link to="/">
//             <button>HOME</button>
//           </Link>
//           <Link to="/boards">
//             <button>BOARDS</button>
//           </Link>
//           {
//             isAuthenticated && <CreateBoard userId={useAuth0?.user?.email} />
//           }
//           {
//             isAuthenticated ? <LogoutButton /> : <LoginButton />
//           }
//         </Drawer>
//       </React.Fragment>
//     </div>
//   )
// }

const Boards = () => {
  const [notes, setNotes] = useState([]);
  const [board, setBoard] = useState({});
  const { user, isAuthenticated } = useAuth0();
  console.log('Board User Details', user);

  const { getNotes, notesLoading, notesData, notesError, startNotesPolling } = getBoardNotes();
  const { fetchBoard, boardLoading, boardData, boardError, startBoardPolling } = getBoard();
  

  let { boardId } = useParams();
  boardId = parseInt(boardId);
  const createNote = addNote({boardId});

  useEffect(() => {
    getNotes({ variables: { board: boardId } });
    fetchBoard({ variables: { board: boardId } });
  }, []);

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
      </Board>
      <StickyFooter justify={'space-between'}>
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
          onClick={() => createNote({ variables: { text: "New Message", level: 'MED', boardId: board } })}
          aria-label="add note"
          size="medium"
        />
      </StickyFooter>
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
      <GlobalStyles />
      <Header>
        <MenuToggle />
        {
          isAuthenticated && <h1>{user.given_name}'s Board</h1>
        }
        {
          isAuthenticated ? <Image width='48' height='48' borderRadius="50 " src={user.picture} /> : <Button text={`Login`} action={loginWithRedirect} />
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
