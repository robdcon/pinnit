import { useMutation, gql } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers'; 

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

export const createUser = () => {
  const [createUser, {loading, data, error}] = useMutation(CREATE_USER, {

        update: (cache, {data: {createUser}}) => {
          cache.modify({
            fields: {
              users(existingUsers = []) {
                const newUserRef = cache.writeFragment({
                  data: createUser,
                  fragment: gql`
                    fragment NewUser on User {
                      id
                      type
                    }
                  `
                });
                console.log("Update Data: ", existingUsers, newUserRef);
                return [...existingUsers, newUserRef];
              }
            }
          })
        }
    });
    return(createUser);
}