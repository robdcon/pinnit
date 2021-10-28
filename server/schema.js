const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        user: String
        users: [User]
        checkUserExists(email: String!, username: String!): UserEmail
        email(email: String!): Int
        emails: [String]
        note(id: String!): Note
        notes(user: String!, board: String!): [Note]
        board(id: String!): Board
        boards(user: String!): [String]
    }
    
    type Mutation {
        createUser(username: String!, email: String!) : User!
        createNote(user: String!, board: String!, text: String!, zindex: Int!, level: String!): String!
        updateNote(user: String!, board: String!, id: String!, text: String, zindex: Int, level: String): String!
        deleteNote(user: String!, board: String!, id: String!): String!
        createBoard(user: String): String!
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
        id: String!
        text: String!
        zindex: Int!
        level: String!
    }

    type Board {
        id: String!
        notes: [String]
    }

    type UserEmail {
        username: Int!
        email: Int!
    }
`;

module.exports = schema;