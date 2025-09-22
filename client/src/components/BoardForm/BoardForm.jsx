import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBoardForm } from './BoardForm.styles';
import { CREATE_BOARD } from '../../graphql/mutations';
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from '@apollo/client';



const BoardForm = ({setBoardEditing}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD, {
    variables: {
      user: user.email,
      name: name,
      board_type: type
    },
    // onCompleted: ({createBoard: id}) => {history.push(`/boards/${id}`); currentBoardVar(id); console.log('Created Board:', id)},
    // refetchQueries: [
    //   {
    //    query:GET_BOARDS,
    //    variables: {
    //      user: userId
    //    }
    //   }
    // ]
  });

  const setBoardName = (name) => {
    setName(name);
  }

  const setBoardType = (type) => {
    setType(type);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoardEditing(false);
    createBoard();
  }

  return (
    <StyledBoardForm className="BoardFormWrapper">
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="board-name">Board name</label>
        <input id="board-name" name="board-name" type="text" onChange={(e) => setBoardName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="board-type">Board type</label>
        <select name="board_type" id="board-type" onChange={(e) => setBoardType(e.target.value)}>
          <option value="">Please select</option>
          <option value="PIN">Pin Board</option>
          <option value="PLAIN">Plain Board</option>
          <option value="CHECKLIST">Plain Board</option>
        </select>
      </div>
      <button type="submit">Create Board</button>
    </form>
    </StyledBoardForm>
  )

}

BoardForm.propTypes = {
  // bla: PropTypes.string,
};

BoardForm.defaultProps = {
  // bla: 'test',
};

export default BoardForm;
