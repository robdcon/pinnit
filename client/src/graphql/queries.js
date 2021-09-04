import { gql } from "@apollo/client"; 

export const GET_NOTES = gql`
  query getAllNotes {
    notes {
      id
      text
      zindex
      level
    }
  }
`;

export const GET_REACTIVE_NOTES = gql`
  query getReactiveNotes{
    localNotes @client
  }
`