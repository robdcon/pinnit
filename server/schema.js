const { gql } = require('apollo-server-express');

const schema = gql`
    type Query {
        get(key: String!): String
    }

    type Mutation {
        set(key: String!, value:  String!): Boolean!
    }

    type User {
        username: String!
        email: String!
        boards: [String]
    }

    type Note {
        id: String!
        text: String!
    }

    type Board {
        notes: [String]
    }
`;

module.exports = schema;