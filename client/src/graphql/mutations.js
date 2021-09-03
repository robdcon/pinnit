import { gql } from "@apollo/client"; 

export const SET_NOTE = gql`
    mutation createNote($text: String!) {
        createNote(text: $text, zindex: 4, level: LOW)
    }
`;