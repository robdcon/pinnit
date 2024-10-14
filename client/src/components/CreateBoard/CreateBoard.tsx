import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_BOARDS } from '../../graphql/queries';
import { StyledCreateBoardButton } from './CreateBoard.styles';
import { currentBoardVar } from '../../cache';
import BoardForm from '../../components/BoardForm';

// const { user, isAuthenticated, isLoading } = useAuth0();

const CreateBoard = ({userId}) => {
  const [boardEditing, setBoardEditing] = useState(false)

  return (
    <div>
      {
        boardEditing && <BoardForm setBoardEditing={setBoardEditing} />
      }
      {
        !boardEditing && 
        <StyledCreateBoardButton className="CreateBoardWrapper">
          <button onClick={() => setBoardEditing(true)}>CREATE BOARD</button>
        </StyledCreateBoardButton>
      }
    </div>
  )
};


export default CreateBoard;
