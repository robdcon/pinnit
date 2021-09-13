import React, {useState} from 'react';
import Board from './components/Board';
import Login from './components/Login/';
import Register from './components/Register';
import { UserContextProvider } from './context/auth';
import { getUser } from './utils/helpers';
const user = getUser();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  return (  
    <UserContextProvider value={{user:loggedInUser, loginUser: (user) => {setLoggedInUser(user)}}} >
      <div className="Pinnit">
        {
          !(localStorage.getItem('loggedIn')) ? (
            <Register />
          ) : null
        }
        <Board />
      </div>
    </UserContextProvider>
    );
}

export default App;
