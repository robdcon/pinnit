require('dotenv').config()

const cors = require('cors')
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const client = require('../datasources/database');
const http = require('http');

const resolvers = require('../resolvers');
const typeDefs = require('../schema');

console.log(process.env);


const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://pinnit-client.vercel.app' : 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
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
  
  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  ).then(() => {
    console.log('USER:', process.env.PGUSER)
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(app, httpServer);

module.exports = app;