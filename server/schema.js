const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        user(email: String): User
        users: [User]
        checkUserExists(email: String!, username: String!): UserEmail
        email(email: String!): Int
        emails: [String]
        note(id: String!): Note
        notes(board: Int!): [Note]
        board(id: Int!): Board
        boards(user: String!): [Int]
    }
    
    type Mutation {
        createUser(username: String!, email: String!) : User!
        createNote(board: Int!, text: String!, level: String): Note!
        updateNote(user: String, board: Int, id: Int!, text: String, zindex: Int, level: String): Note!
        deleteNote(id: Int!): String!
        createBoard(user: String): Int!
        shareBoard(user: String!, board: String!): String
    }

    type User {
        id: String!
        username: String!
        email: String!
        boards: [String]
        sharedBoards: [String]
    }

    type Note {
        id: Int!
        board_id: Int!
        text: String!
        zindex: Int
        level: String
    }

    type Board {
        id: Int!
        name: String!
        notes: [Int]
    }

    type UserEmail {
        username: Int!
        email: Int!
    }
`;

module.exports = schema;