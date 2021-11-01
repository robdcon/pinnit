import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS, GET_USER } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers'; 
import { loggedInUserVar } from "../cache";

// Notes 

export const addNote = ({userId, boardId}) => {
  const [createNote, loading, data, error] = useMutation(CREATE_NOTE, {
    variables: {
      user:userId, 
      board:boardId,
      text: `New Note ${userId}:${boardId}`,
      zindex: 0,
      level: 'MED'
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        user: userId,
        board: boardId
      }
    }],
    onCompleted: (data) => {
      console.log('Mutation:', data)
    }
  });
  return createNote;
}

export const editNote = ({userId, boardId}) => {
  const [updateNote] = useMutation(UPDATE_NOTE, {
      variables: {
        user:userId, 
        board:boardId
      },
      refetchQueries: [{
        query: GET_NOTES,
        variables: {
          user: userId,
          board: boardId
        }
      }],
        onCompleted: (data) => {
          console.log('Updated:', data)
        }
    });
    return(updateNote);
}

export const deleteNote = ({userId, boardId}) => {
  const [removeNote] = useMutation(DELETE_NOTE, {
    variables: {
      user:userId, 
      board:boardId
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        user: userId,
        board: boardId
      }
    }],
        onCompleted: (data) => {
          console.log('Deleted:', data)
        }
    });
    return(removeNote);
}

// Users

export const createUser = () => {
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({createUser}) => {
      setToLocalStorage('loggedInUser', createUser);
      loggedInUserVar(createUser);
      console.log("Created User: ", createUser);
    }
  });
  return(createUser);
}

export const shareBoard = () => {
  const [shareBoard] = useMutation(SHARE_BOARD, {
    onCompleted: (data) => {
      console.log(data)
    }
  })
  return shareBoard;
}