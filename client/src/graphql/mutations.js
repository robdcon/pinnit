import { gql } from "@apollo/client";

// Boards

export const CREATE_BOARD = gql`
    mutation createBoard($user: String!, $name: String!, $board_type: String!) {
        createBoard(user:$user, name: $name, board_type: $board_type)
    }
`;

export const SHARE_BOARD = gql`
    mutation shareBoard($user: String!, $board: String!) {
        shareBoard(user:$user, board: $board)
    }
`;

// Notes

export const CREATE_NOTE = gql`
    mutation createNote($board: Int!, $text: String!, $level: String) {
        createNote(board: $board, text: $text, level: $level) {
            id
            text
            level
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($id: Int!, $text: String, $zindex: Int, $level: String) {
        updateNote(id: $id, text: $text, zindex: $zindex, level: $level) {
            id
            text
            level
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($id: Int!) {
        deleteNote(id: $id)
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