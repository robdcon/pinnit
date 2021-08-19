import React, { createContext, useEffect, useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { SET_NOTE } from '../utils/mutations';

const GraphQlContext = createContext();

export const GraphQlProvider = ({children}) => {
    const [setNote, { data, loading, error }] = useMutation(SET_NOTE)

    const createNote = (text) => {
        setNote({variables: {
            text: text
        }})
    }

    return (
        <GraphQlContext.Provider value={createNote}>{children}</GraphQlContext.Provider>
    );
}

export const GraphQlConsumer = GraphQlContext.Consumer;

export default GraphQlContext;
