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
`;

export const GET_USER = gql`
  query getUser($id: String, $email: String, $username: String) {
    user(id: $id, email: $email, username: $username) {
      id
      username
      email
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      username
      email
    }
  }
`;

export const CHECK_EMAIL = gql`
  query checkEmailExists($email: String!) {
    email(email: $email)
  }
`;

export const GET_EMAILS = gql`
  query getEmails {
    emails
  }
`;