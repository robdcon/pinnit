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

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  console.log(`CORS: ${corsOptions.origin}`);
  res.send(`Hey this is my API running 🥳 ${process.env.TEST_TEXT}`)
})

app.get('/api/db-test', async (req, res) => {
  // const startTime = Date.now();
  console.log('DB test endpoint hit');
  
  // try {
  //   const client = await pgPool.connect();
  //   console.log('Connection acquired after:', Date.now() - startTime, 'ms');
    
  //   const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
  //   client.release();
    
  //   console.log('Query successful after:', Date.now() - startTime, 'ms');
    
  //   res.json({
  //     success: true,
  //     duration: Date.now() - startTime,
  //     data: result.rows[0]
  //   });
  // } catch (error) {
  //   console.error('DB connection failed after:', Date.now() - startTime, 'ms');
  //   console.error('Error:', error.message);
  //   console.error('Error code:', error.code);
    
  //   res.status(500).json({
  //     success: false,
  //     duration: Date.now() - startTime,
  //     error: error.message,
  //     code: error.code
  //   });
  // }
});




const httpServer = http.createServer(app);

async function startApolloServer(app, httpServer) {

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
    console.log('USER:', process.env.PGUSER)
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  }).then(() => {

  });
}

startApolloServer(app, httpServer);

module.exports = app;