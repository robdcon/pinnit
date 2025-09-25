const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        user(email: String): User
        users: [User]
        checkUserExists(email: String!, username: String!): UserEmail
        email(email: String!): Int
        emails: [String]
        note(id: String!): Note
        notes(board: Int!): [Note]
        board(board: Int!): Board
        boards(user: String!): [Int]
        item(id: String!): Item
        items(board: Int!): [Item]
    }
    
    type Mutation {
        createUser(username: String!, email: String!) : User!
        createNote(board: Int!, content: String!, level: String, checked: Boolean, category: String): Note!
        updateNote(user: String, board: Int, id: Int!, content: String, zindex: Int, level: String, checked: Boolean, category: String): Note!
        deleteNote(id: Int!): String!
        createBoard(user: String!, name: String!, board_type: String): Int!
        shareBoard(user: String!, board: Int!): String
        createItem(board: Int!, name: String!, priority: String, checked: Boolean, category: String): Item!
        updateItem(id: Int!, name: String, priority: String, checked: Boolean, category: String): Item!
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
        content: String!
        zindex: Int
        level: String
        checked: Boolean
        category: String
    }

    type Item {
        id: Int!
        name: String!
        priority: String
        checked: Boolean
        category: String
    }

    type Board {
        id: Int!
        name: String
        board_type: String
    }

    type UserEmail {
        username: Int!
        email: Int!
    }
`;

module.exports = typeDefs;