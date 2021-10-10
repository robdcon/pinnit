import { useQuery, useLazyQuery } from "@apollo/client";
import { 
    GET_NOTES, 
    CHECK_USER, 
    GET_EMAILS, 
    GET_BOARDS, 
    GET_USERS 
} from '../graphql/queries';

export const getBoards = () => {
    const [getBoardIds, { loading, data, error, startPolling }] = useLazyQuery(GET_BOARDS);
    return { getBoardIds, boardLoading:loading, boardData:data, boardError:error, startBoardPolling:startPolling };
}

export const getBoardNotes = () => {
    const [getNotes, {loading, data, error, startPolling}] = useLazyQuery(GET_NOTES);
    return {getNotes, notesLoading: loading, notesData: data, notesError: error, startNotesPolling: startPolling};
}


// Users
export const getUser = () => {
    const { loading, data, error } = useQuery(GET_USER);
    return { loading, data, error };
}

export const getUsers = () => {
    const { loading, data, error } = useQuery(GET_USERS);
    return { usersLoading: loading, usersData: data, usersError:error };
}

export const checkUser = () => {
    const [checkUserExists, {loading, data, error}] = useLazyQuery(CHECK_USER);
    return {checkUserExists, checkLoading: loading, checkData:data, checkError:error};
}

export const getEmails = () => {
    const {loading, data, error} = useQuery(GET_EMAILS);
    return  {loading, data, error};
}
