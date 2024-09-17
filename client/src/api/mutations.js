import { useMutation } from "@apollo/client";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER } from '../graphql/mutations';
import { GET_NOTES, GET_USERS, GET_USER } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers'; 
import { loggedInUserVar } from "../cache";
import { 
  ApolloClient, 
  ApolloLink,
  ApolloProvider,
  gql,
  useReactiveVar,
  HttpLink,
  concat
} from '@apollo/client';

// Notes 

export const addNote = ({boardId}) => {
  const [createNote] = useMutation(CREATE_NOTE, {
    // update(cache, { data: { createNote } }) {
    //   cache.modify({
    //     fields: {
    //       notes(existingNotes = []) {
    //         const newNoteRef = cache.writeFragment({
    //           data: createNote,
    //           fragment: gql`
    //             fragment NewNote on Notes {
    //               id
    //               type
    //             }
    //           `
    //         });
    //         return [...existingNotes, newNoteRef];
    //       }
    //     }
    //   });
    // },
    variables: {
      board:boardId,
      text: `New Note:${boardId}`,
      level: 'MED'
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        board: boardId
      }
    }],
    onCompleted: (data) => {
      console.log('Mutation:', data)
    }
  });
  return createNote;
}

export const editNote = ({id}) => {
  const [updateNote] = useMutation(UPDATE_NOTE, {
      // refetchQueries: [{
      //   query: GET_NOTES,
      //   variables: {
      //     board: id
      //   }
      // }],
      //   onCompleted: (data) => {
      //     console.log('Updated:', data)
      //   }
    });
    return({updateNote});
}

export const deleteNote = ({userId, boardId}) => {
  const [removeNote] = useMutation(DELETE_NOTE, {
    variables: {
      user:userId, 
      board:boardId
    }
    });
    return(removeNote);
}

// Users

export const createUser = ({username, email}) => {
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      username, 
      email
    },
    onCompleted: ({createUser}) => {
      setToLocalStorage('loggedInUser', createUser);
      loggedInUserVar(createUser);
      console.log("Created User: ", createUser);
    }
  });
  return(createUser);
}

export const shareBoard = () => {
  const [shareBoard] = useMutation(SHARE_BOARD, {
    onCompleted: (data) => {
      console.log(data)
    }
  })
  return shareBoard;
}