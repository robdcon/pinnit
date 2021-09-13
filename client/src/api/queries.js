import { useQuery, useLazyQuery, useApolloClient } from "@apollo/client";
import { useEffect } from 'react';
import { GET_NOTES, GET_REACTIVE_NOTES, CHECK_EMAIL, GET_EMAILS } from '../graphql/queries';
import React from "react";

export const getNotes = () => {
    const { loading, data, error } = useQuery(GET_NOTES);
    return { loading, data, error };
}

export const getUser = () => {
    const { loading, data, error } = useQuery(GET_USER);
    return { loading, data, error };
}

export const checkEmail = () => {
    const [checkEmailExists, {loading, data, error}] = useLazyQuery(CHECK_EMAIL);
    return {checkEmailExists, checkLoading: loading, checkData:data, checkError:error};
}

export const getEmails = () => {
    const {loading, data, error} = useQuery(GET_EMAILS);
    return  {loading, data, error};
}
