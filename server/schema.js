const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        user(id: String!): User
        users: [User]
        note(id: String!): Note
        notes: [Note]
        board(id: String!): Board
    }

    type Mutation {
        createUser(username: String!, email: String!) : String!
        createNote(text: String!, zindex: Int!, level: Level!): String!
        updateNote(id: String!, text: String, zindex: Int, level: Level): String!
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
        level: Level!
    }

    type Board {
        id: String!
        notes: [String]
        users: [User]!
    }

    enum Level {
        HIGH
        MED
        LOW
    }
`;

module.exports = schema;