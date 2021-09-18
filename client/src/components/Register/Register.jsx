import React, { useEffect, useState } from 'react';
import { RegisterWrapper } from './Register.styles';
import { createUser } from '../../api/mutations';
import { checkUser } from '../../api/queries';
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
      loginUser(userData);
      setToLocalStorage('currentUser', user );
      setToLocalStorage('loggedIn', true);
    })
  }

  const {checkUserExists, checkLoading, checkData, checkError} = checkUser();

  useEffect(() => {
    setUserData({username: username, email: email});
   // console.log(userData, email, username)
  }, [username, email]);

  useEffect(() => {
    console.log(checkData);
    if(checkData === undefined) return;
    if(checkData.checkUserExists.username === 1) {
      console.log('Username registered');
    } else if (checkData.checkUserExists.email === 1) {
      console.log('Email exists')
    } else {
      registerUser();
    }
  }, [ checkData ]);
  
  const handleSubmit = () => {
    console.log(userData);
    checkUserExists({variables: userData});
  }

  return (
    <UserContextConsumer>
    {({user, loginUser}) => ( 
      <RegisterWrapper className="register-wrapper">
        <p>Register</p>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit(); console.log(user)}}>
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
