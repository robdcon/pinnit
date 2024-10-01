// require('dotenv').config()
const cors = require('cors')
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const client = require('../datasources/database');
const http = require('http');

const resolvers = require('../resolvers');
const typeDefs = require('../schema');

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hey this is my API running 🥳 ${process.env.TEST_TEXT}`)
})

const httpServer = http.createServer(app);

async function startApolloServer(app, httpServer) {

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: client,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  server.applyMiddleware({ app, path:'/graphiql' });
}

startApolloServer(app, httpServer);

module.exports = app;