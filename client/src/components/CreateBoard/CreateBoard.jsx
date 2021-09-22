import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { CREATE_BOARD } from '../../graphql/mutations';
import { GET_BOARDS } from '../../graphql/queries';
import { StyledCreateBoardButton } from './CreateBoard.styles';
import { currentBoardVar } from '../../cache';

const CreateBoard = ({userId}) => {
  const history = useHistory();
  const [createBoard] = useMutation(CREATE_BOARD, {
    variables: {user: userId},
    onCompleted: ({createBoard: id}) => {history.push(`/${id}`); currentBoardVar(id); console.log('Created Board:', id)},
    refetchQueries: [
      {
       query:GET_BOARDS,
       variables: {
         user: userId
       }
      }
    ]
  });

  return (
  <StyledCreateBoardButton className="CreateBoardWrapper">
    <button onClick={() => createBoard()}>CREATE BOARD</button>
  </StyledCreateBoardButton>
)};


export default CreateBoard;
