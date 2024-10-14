import React, { useEffect, useState } from 'react';
import { RegisterWrapper } from './Register.styles';
import { createUser } from '../../api/mutations';
import { checkUser } from '../../api/queries';
import { loggedInUserVar } from '../../cache';

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({});

  const addUser = createUser();

  const registerUser = () => {
    addUser({variables: userData})
    .then(({data}) => {
      loggedInUserVar(data);   
    })
  }

  const {checkUserExists, checkLoading, checkData, checkError} = checkUser();

  useEffect(() => {
    setUserData({username: username, email: email});
  }, [username, email]);

  useEffect(() => {
    if(checkData === undefined) return;
    if(checkData.checkUserExists.username === 1) {
      console.log('Username registered');
    } else if (checkData.checkUserExists.email === 1) {
      console.log('Email exists')
    } else {
      registerUser();
    }
  }, [checkData]);
  
  const handleSubmit = () => {
    checkUserExists({variables: userData});
  }

  return (
      <RegisterWrapper className="register-wrapper">
        <p>Register</p>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
          <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="submit" type="submit" value="Register" />
        </form>
      </RegisterWrapper>
  )
};

export default Register;
