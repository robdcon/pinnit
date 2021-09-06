import { gql } from "@apollo/client"; 

export const CREATE_NOTE = gql`
    mutation createNote($text: String!, $level: String!) {
        createNote(text: $text, zindex: 0, level: $level)
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($id: String!, $text: String, $zindex: Int, $level: String) {
        updateNote(id: $id, text: $text, zindex: $zindex, level: $level)
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($id: String!) {
        deleteNote(id: $id)
    }
`;