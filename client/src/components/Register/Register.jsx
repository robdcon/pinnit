import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { RegisterWrapper } from './Register.styles';
import { createUser } from '../../api/mutations';
import { getUser, getEmails, checkEmail } from '../../api/queries';
import { setToLocalStorage } from '../../utils/helpers';
import { UserContextConsumer } from '../../context/auth';

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({});
  const addUser = createUser();

  const registerUser = () => {
    addUser({variables: userData})
   .then(({data}) => {
     console.log('submitted:', data)
     const userData = data.createUser;
     const user = JSON.stringify({id: userData.id, username: userData.username, email: userData.email})
     setToLocalStorage('currentUser', user );
     setToLocalStorage('loggedIn', true);
   })
  }

  const {checkEmailExists, checkLoading, checkData, checkError} = checkEmail(registerUser);

  useEffect(() => {
    setUserData({username: username, email: email});
    console.log(userData, email, username)
  }, [username, email]);

  useEffect(() => {
    if(checkData && checkData.email < 0) {
      console.log('User registered');
      registerUser();
    } else if (checkData && checkData.email > 0) {
      console.log('User exists')
    }
  }, [ checkData ]);
  
  const handleSubmit = () => {
    checkEmailExists({variables: {email}});
  }

  return (
    <UserContextConsumer>
    {({user, loginUser}) => ( 
      <RegisterWrapper className="register-wrapper">
        <p>Register</p>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit(loginUser); }}>
          <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="submit" type="submit" value="Register" />
        </form>
      </RegisterWrapper>
    )}
    </UserContextConsumer>
  )
};

export default Register;
