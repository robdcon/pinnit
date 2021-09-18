import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CREATE_BOARD } from '../../graphql/mutations';

import { StyledCreateBoardButton } from './CreateBoard.styles';
const CreateBoard = (props) => {
  const history = useHistory();
  const [createBoard] = useMutation(CREATE_BOARD, {
    variables: {
      user: '1000'
    },
    onCompleted: () => history.push('/')
  });

  const 

  return (
  <StyledCreateBoardButton className="CreateBoardWrapper">
    <button>CREATE BOARD</button>
  </StyledCreateBoardButton>
)};


export default CreateBoard;
