import { gql } from "@apollo/client"; 

export const CREATE_NOTE = gql`
    mutation createNote($text: String!) {
        createNote(text: $text, zindex: 4, level: LOW)
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($id: String!, $text: String, $zindex: Int, $level: Level) {
        updateNote(id: $id, text: $text, zindex: $zindex, level: $level)
    }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($id: String!) {
        deleteNote(id: $id)
    }
`;