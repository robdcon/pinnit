import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_USER, UPDATE_ITEM, CREATE_ITEM } from '../graphql/mutations';
import { GET_NOTES, GET_ITEMS } from '../graphql/queries';
import { setToLocalStorage } from '../utils/helpers';
import { loggedInUserVar } from "../cache";
import { BoardContext } from "../App";

// Notes 

export const addNote = ({ boardId }) => {
  const [createNote] = useMutation(CREATE_NOTE, {
    variables: {
      board: boardId,
      content: "{\"text\":\"new note 1`\"}",
      level: 'MED'
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        board: boardId
      }
    }],
    onCompleted: (data) => {
      console.log('addNote:', data)
    }
  });

  // if (loading) return "Submitting...";
  // if (error) return `Submission error! ${error.message}`;
  return createNote;
}

export const editNote = ({ id, board }) => {
  const [updateNote, { data, loading, error }] = useMutation(UPDATE_NOTE);
  return ({ updateNote });
}

// Items

// Edit Item
export const editItem = ({id, board}) => {
  const [updateItem, { data, loading, error }] = useMutation(UPDATE_ITEM, {
    variables: {
      id: id
    },
    refetchQueries: [{
      query: GET_ITEMS,
      variables: {
        board: board
      }
    }]
  });
  return ({ updateItem });
}

// Add item
export const addItem = () => {
  const {board} = useContext(BoardContext);
  
  const [createItem, { data, loading, error }] = useMutation(CREATE_ITEM, {
    refetchQueries: [{
      query: GET_ITEMS,
      variables: {
        board
      }
    }],
    onCompleted: (data) => {
      console.log('addItem:', data)
    },
    onError(err) {
      alert('Error creating item: ' + err.message);
      console.log(err);
    },
  });
  
  return createItem;
}

export const deleteNote = ({ id, board }) => {
  const [removeNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: id
    },
    refetchQueries: [{
      query: GET_NOTES,
      variables: {
        board: board
      }
    }],
    onComplete: (data) => {
      console.log('Note deleted:', data);
    }
  });
  return ({ removeNote });
}

// Users

export const createUser = ({ username, email }) => {
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      username,
      email
    },
    onCompleted: ({ createUser }) => {
      setToLocalStorage('loggedInUser', createUser);
      loggedInUserVar(createUser);
    }
  });
  return (createUser);
}

export const shareBoard = () => {
  const [shareBoard] = useMutation(SHARE_BOARD, {
    onCompleted: (data) => {
      console.log(data)
    }
  })
  return shareBoard;
}