import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_NOTES, CHECK_USER, GET_EMAILS } from '../graphql/queries';

export const getNotes = () => {
    const { loading, data, error } = useQuery(GET_NOTES, {
        pollInterval: 0
    });
    return { loading, data, error };
}

export const getUser = () => {
    const { loading, data, error } = useQuery(GET_USER);
    return { loading, data, error };
}

export const checkUser = () => {
    const [checkUserExists, {loading, data, error}] = useLazyQuery(CHECK_USER);
    return {checkUserExists, checkLoading: loading, checkData:data, checkError:error};
}

export const getEmails = () => {
    const {loading, data, error} = useQuery(GET_EMAILS);
    return  {loading, data, error};
}
