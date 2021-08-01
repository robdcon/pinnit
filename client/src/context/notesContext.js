import React, { createContext, useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_NOTES } from '../graphql/getNotes';

const NotesContext = createContext();

export const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const updateNotes = () => {
        setNotes(data)
    }
    const { loading, data, error } = useQuery(GET_NOTES, {
        onCompleted: updateNotes
    });
    // const notes = loading || error ? null : data;
  return (
    <NotesContext.Provider value={notes}>{children}</NotesContext.Provider>
  );
    
}

export const NotesConsumer = NotesContext.Consumer;

export default NotesContext;