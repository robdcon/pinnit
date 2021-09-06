import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../graphql/mutations';
import { GET_NOTES } from '../graphql/queries';

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
        ],
        update: (e) => {console.log("Event:", e)}
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