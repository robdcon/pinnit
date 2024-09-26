import React from 'react';
import { StyledShareBoard } from './ShareBoard.styles';
import { useMutation } from '@apollo/client';
import { SHARE_BOARD } from '../../graphql/mutations';

const ShareBoard = ({boardId, username, text}) => {
  const [shareBoard] = useMutation(SHARE_BOARD, {
    onCompleted: (data) => {
      console.log(data)
    }
  })

  const handleShareBoard = () => {
    shareBoard({variables: {user: `${username}`, board: `${boardId}`}})
  }

  return (
    <StyledShareBoard className="share-board-wrapper">
      <button onClick={() => handleShareBoard()} disabled={(typeof(boardId) === 'undefined')}>{text}</button>
    </StyledShareBoard>
  )
};

export default ShareBoard;
