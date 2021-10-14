import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS, GET_USER } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers'; 
import { loggedInUserVar } from "../cache";

// Notes 

export const addNote = ({userId, boardId}) => {
  const [createNote, {loading, data, error}] = useMutation(CREATE_NOTE, {
    variables: {
      user: `${userId}`, 
      board: `${boardId}`, 
      text: `New Note for ${boardId}`, 
      level: "HIGH", 
      zindex: 0
    },
    onCompleted: (note) => {
      console.log('Created Note:', note)
    },
    refetchQueries: [
      {
       query:GET_NOTES,
       variables: {
         user: `${userId}`,
         board: `${boardId}`
       }
      }
    ]
  });

  return createNote;
}

export const editNote = ({userId, boardId}) => {
  const [updateNote, {loading, data, error}] = useMutation(UPDATE_NOTE, {
        variables: {
          user: `${userId}`,
          board: `${boardId}`
        },
        refetchQueries: [
          {
           query:GET_NOTES,
           variables: {
             user: `${userId}`,
             board: `${boardId}`
           }
          }
        ]
    });
    return(updateNote);
}

export const deleteNote = () => {
  const [removeNote, {loading, data, error}] = useMutation(DELETE_NOTE, {
        refetchQueries: [
          GET_NOTES
        ]
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