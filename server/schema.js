const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        user(id: String!): User
        users: [User]
        checkUserExists(email: String!, username: String!): UserEmail
        email(email: String!): Int
        emails: [String]
        note(id: String!): Note
        notes: [Note]
        board(id: String!): Board
    }

    type Mutation {
        createUser(username: String!, email: String!) : User!
        createNote(text: String!, zindex: Int!, level: String!): String!
        updateNote(id: String!, text: String, zindex: Int, level: String): String!
        deleteNote(id: String!): String!
        createBoard(users: [String]!, notes: [String]!): String!
    }

    type User {
        id: String!
        username: String!
        email: String!
        boards: [String]
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
        users: [User]!
    }

    type UserEmail {
        username: Int!
        email: Int!
    }
`;

module.exports = schema;