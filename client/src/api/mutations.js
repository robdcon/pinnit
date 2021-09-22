import { useMutation, gql } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS, GET_USER } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers'; 
import { loggedInUserVar } from "../cache";

// Notes 

export const setNote = (noteData) => {
  const [addNote, {loading, data, error}] = useMutation(CREATE_NOTE, {
        noteData,
        refetchQueries: [
          {
            query:GET_NOTES
          }
        ]
    });
    return(addNote);
}

export const updateNote = () => {
  const [updateNoteData, {loading, data, error}] = useMutation(UPDATE_NOTE, {
        refetchQueries: [
          GET_NOTES
        ]
    });
    return(updateNoteData);
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