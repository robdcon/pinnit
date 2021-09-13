import React, { useEffect, useState } from 'react';
import { LoginWrapper } from './Login.styles';
import { createUser } from '../../api/mutations';
import { setToLocalStorage } from '../../utils/helpers';
import { UserContextConsumer } from '../../context/auth';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  // const addUser = createUser();
  
  useEffect(() => {
    setData({username: username, email: email});
    console.log(data)
  }, [username, email]);
  
  const handleSubmit = (callback) => {
    // addUser({variables: data})
    setToLocalStorage('01', username);
    setToLocalStorage('loggedIn', '01');
    callback(data);
  }

  return (
    <UserContextConsumer>
    {({user, loginUser}) => ( 
      <LoginWrapper className="login-wrapper">
        <p>LOGIN</p>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit(loginUser); }}>
          <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="submit" type="submit" value="Login" />
        </form>
      </LoginWrapper>
    )}
    </UserContextConsumer>
  )
};

export default Login;
