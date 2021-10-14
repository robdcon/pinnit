import { gql } from "@apollo/client"; 

// Boards

export const CREATE_BOARD = gql`
    mutation createBoard($user: String!) {
        createBoard(user:$user)
    }
`;

export const SHARE_BOARD = gql`
    mutation shareBoard($user: String!, $board: String!) {
        shareBoard(user:$user, board: $board)
    }
`;

// Notes

export const CREATE_NOTE = gql`
    mutation createNote($user: String!, $board: String!, $text: String!, $level: String!) {
        createNote(user: $user, board: $board, text: $text, zindex: 0, level: $level)
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($user: String!, $board: String!, $id: String!, $text: String, $zindex: Int, $level: String) {
        updateNote(user: $user, board: $board, id: $id, text: $text, zindex: $zindex, level: $level)
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($user: String!, $board: String!, $id: String!) {
        deleteNote(user: $user, board: $board, id: $id)
    }
`;

// Users

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!) {
        createUser(username: $username, email: $email) {
            id
            email
            username
        }
    }
`;