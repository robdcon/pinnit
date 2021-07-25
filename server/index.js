const express = require("express");
const { dirname } = require("path");
const util = require('util');
// const bodyParser = require('body-parser');
const path = require('path');
const { promisify } = require("util");
const { ApolloServer } = require('apollo-server-express');
const redis = require("redis");
const client = redis.createClient("redis://:p90fa099ef7d06e68a2c6dc1be82483d68be0d33bf32b918c9efe1fecc554b329@ec2-99-80-230-229.eu-west-1.compute.amazonaws.com:27879");
let get = util.promisify(client.get).bind(client);
let set = util.promisify(client.set).bind(client);
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const PORT = process.env.PORT || 3001;

// client.set("key", "value2", redis.print);
// const req = client.get("key", redis.print);
// console.log(req);

async function startApolloServer() {

  const server = new ApolloServer({ typeDefs, resolvers, context:{get, set} });

  await server.start();

  var app = express();
  
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  
  app.get("/api", (req, res) => {
      res.json({ message: "Hello from server!" });
  });

  server.applyMiddleware({app, path:'/graphiql'});
  
  app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html' ));
  });
  
  await new Promise(resolve => app.listen(PORT, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

  return {server, app}
}

startApolloServer();


