import { gql } from "@apollo/client"; 

export const GET_BOARDS = gql`
    query getBoards($user: String!) {
        boards(user:$user)
    }
`;

export const GET_NOTES = gql`
  query getNotes($user: String!, $board: String! ) {
    notes(user: $user, board: $board) {
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

export const GET_LOGGEDIN_USER = gql`
  query getLoggedinUser {
    user
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

export const CHECK_USER = gql`
  query checkUser($email: String!, $username: String!) {
    checkUserExists(email: $email, username: $username) {
      email
      username
    }
  }
`;

export const GET_EMAILS = gql`
  query getEmails {
    emails
  }
`;