import React, { useEffect, useState } from 'react';
import { LoginWrapper } from './Login.styles';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    setData({username: username, email: email});
    console.log(data)
  }, [username, email])

  return (
    <LoginWrapper className="login-wrapper">
      <form onSubmit={(e) => {e.preventDefault(); console.log(data);}}>
        <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input id="submit" type="submit" value="Create User" />
      </form>
    </LoginWrapper>
  )
};

export default Login;
