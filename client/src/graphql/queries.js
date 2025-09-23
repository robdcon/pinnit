import { gql } from "@apollo/client"; 

export const GET_BOARD = gql`
    query getBoard($board: Int!) {
        board(board:$board) {
          id
          name
          board_type
        }
    }
`;

export const GET_BOARDS = gql`
    query getBoards($user: String!) {
        boards(user:$user)
    }
`;

export const GET_NOTES = gql`
  query getNotes($board: Int!) {
    notes(board: $board) {
      id
      content
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
  query getUser($email: String) {
    user(email: $email) {
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