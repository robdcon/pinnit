import { gql } from "@apollo/client"; 

export const GET_NOTES = gql`
  {
    notes {
      id
      text
      zindex
      level
    }
  }
`;