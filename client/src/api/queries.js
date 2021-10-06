import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_NOTES, CHECK_USER, GET_EMAILS, GET_BOARDS } from '../graphql/queries';

export const getBoards = () => {
    const [getBoardIds, { loading, data, error }]= useLazyQuery(GET_BOARDS);
    return { getBoardIds, boardLoading:loading, boardData:data, boardError:error };
}

export const getBoardNotes = () => {
    const [getNotes, {loading, data, error}] = useLazyQuery(GET_NOTES);
    return {getNotes, notesLoading: loading, notesData: data, notesError: error };
}

export const getNotes = (userId, boardId) => {
    const { loading, data, error } = useQuery(GET_NOTES, {
        variables: {
            board: `${boardId}`,
            user: `${userId}`
        },
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
