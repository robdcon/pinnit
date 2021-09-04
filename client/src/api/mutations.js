import { useMutation } from "@apollo/client";
import { SET_NOTE } from '../graphql/mutations';
import { GET_NOTES } from '../graphql/queries';

export const setNote = (noteData) => {
  const [addNote, {loading, data, error}] = useMutation(SET_NOTE, {
        noteData,
        refetchQueries: [
          GET_NOTES
        ]
    });
    return(addNote);
}