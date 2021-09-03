import React from 'react';
import { useMutation } from "@apollo/client";
import { SET_NOTE } from '../graphql/mutations';
import { GET_NOTES } from '../graphql/queries';


export const setNote = () => {
    const [setNote, { loading, data, error }] = useMutation(SET_NOTE, {
      refetchQueries: [
        GET_NOTES
      ]
    });
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    return data;
}