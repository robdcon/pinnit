import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers';
import { loggedInUserVar } from "../cache";

// Notes 

export const addNote = ({ boardId }) => {
  const [createNote] = useMutation(CREATE_NOTE, {
    variables: {
      board: boardId,
      content: `New Note:${boardId}`,
      level: 'MED'
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        board: boardId
      }
    }],
    onCompleted: (data) => {
      console.log('Mutation:', data)
    }
  });
  return createNote;
}

export const editNote = ({ id, board }) => {
  console.log('params:', id, board);
  
  const [updateNote] = useMutation(UPDATE_NOTE);
  return ({ updateNote });
}

export const deleteNote = ({ id, board }) => {
  const [removeNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: id
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        board: board
      }
    }],
    onComplete: (data) => {
      console.log('Note deleted:', data);
    }
  });
  return ({ removeNote });
}

// Users

export const createUser = ({ username, email }) => {
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      username,
      email
    },
    onCompleted: ({ createUser }) => {
      setToLocalStorage('loggedInUser', createUser);
      loggedInUserVar(createUser);
      console.log("Created User: ", createUser);
    }
  });
  return (createUser);
}

export const shareBoard = () => {
  const [shareBoard] = useMutation(SHARE_BOARD, {
    onCompleted: (data) => {
      console.log(data)
    }
  })
  return shareBoard;
}