// require('dotenv').config()
const cors = require('cors')
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const client = require('../datasources/database');
const http = require('http');
const pgPool = require('../datasources/postgres').pgPool;

const resolvers = require('../resolvers');

const typeDefs = require('../schema');

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://pinnit-client.vercel.app' : '*',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/db-test', (req, res) => {
 console.log(pgPool);
 
  res.send(`Test DB 🥳 ${process.env.TEST_TEXT}`)
});

app.get('/', (req, res) => {
  console.log(`CORS: ${corsOptions.origin}`);
  res.send(`Hey this is my API running 🥳 ${process.env.TEST_TEXT}`)
});

const httpServer = http.createServer(app);

async function startApolloServer(app, httpServer) {

  const pgClient = await pgPool.connect();

  pgClient.on('error', (err) => {
    console.error('Unexpected error on idle pgClient', err);
    process.exit(-1);
  });

  pgClient.on('connection', (pgClient) => {
    console.log('PostgreSQL client connected');
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: client,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphiql' });

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  ).then(() => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(app, httpServer);

module.exports = app;