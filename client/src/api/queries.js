import { useQuery, useLazyQuery } from "@apollo/client";
import { 
    GET_NOTES, 
    GET_ITEMS, 
    CHECK_USER, 
    GET_EMAILS, 
    GET_BOARDS, 
    GET_BOARD,
    GET_USERS,
    GET_USER,
    GET_LOGGEDIN_USER
} from '../graphql/queries';

export const getBoard = (boardId) => {
    console.log('getBoard called with boardId:', boardId);
    
    const [getBoard, { loading, data, error, startPolling }] = useLazyQuery(GET_BOARD, {
        variables: { board: boardId },
        onCompleted: (data) => {
            console.log('getBoard:', data);
        }
    });
    return { fetchBoard:getBoard , boardLoading:loading, boardData:data, boardError:error, startBoardPolling:startPolling };
}

export const getBoards = () => {
    const [getBoardIds, { loading, data, error, startPolling }] = useLazyQuery(GET_BOARDS, {
        onCompleted: (data) => {
            console.log('getBoards:', data); 
        }
    });
    return { getBoardIds, boardIdsLoading:loading, boardIdsData:data, boardIdsError:error, startBoardIdsPolling:startPolling };
}

export const getBoardNotes = () => {
    const [getNotes, { loading, data, error, startPolling }] = useLazyQuery(GET_NOTES, {
        onCompleted: (data) => {
            console.log('getBoardNotes:', data); 
        }
    });
    return { getNotes, notesLoading:loading, notesData:data, notesError:error, startNotesPolling:startPolling};
}

export const getBoardItems = () => {
    const [getItems, { loading, data, error, startPolling }] = useLazyQuery(GET_ITEMS, {
        onCompleted: (data) => {
            console.log('getBoardItems:', data); 
        }
    });
    return { getItems, itemsLoading:loading, itemsData:data, itemsError:error, startItemsPolling:startPolling};
}


// Users
export const getUser = ({email}) => {
    const [getUser, {loading, data, error}] = useLazyQuery(GET_USER, {
        variables: {
          email
        }
    });
    return { fetchUser: getUser, userLoading: loading, userData: data, userError: error };
}

export const getLoggedinUser = () => {
    const { loading, data, error } = useQuery(GET_LOGGEDIN_USER);
    return { userLoading: loading, userData: data, userError: error };
}

// export const getUsers = () => {
//     const { loading, data, error } = useQuery(GET_USERS);
//     return { usersLoading: loading, usersData: data, usersError:error };
// }

// export const checkUser = () => {
//     const [checkUserExists, {loading, data, error}] = useLazyQuery(CHECK_USER);
//     return {checkUserExists, checkLoading: loading, checkData:data, checkError:error};
// }

// export const getEmails = () => {
//     const {loading, data, error} = useQuery(GET_EMAILS);
//     return  {loading, data, error};
// }
