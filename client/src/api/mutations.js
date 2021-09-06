import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS } from '../graphql/queries';

// Notes 

export const setNote = (noteData) => {
  const [addNote, {loading, data, error}] = useMutation(CREATE_NOTE, {
        noteData,
        refetchQueries: [
          GET_NOTES
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

export const createUser = (user) => {
  const [createUser, {loading, data, error}] = useMutation(CREATE_USER, {
        noteData,
        refetchQueries: [
          GET_USERS
        ]
    });
    return(createUser);
}