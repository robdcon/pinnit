const express = require("express");
const { dirname } = require("path");
const util = require('util');
const path = require('path');
const { promisify } = require("util");
const { ApolloServer } = require('apollo-server-express');
const redis = require("redis");
const client = redis.createClient("redis://:p90fa099ef7d06e68a2c6dc1be82483d68be0d33bf32b918c9efe1fecc554b329@ec2-52-19-159-143.eu-west-1.compute.amazonaws.com:12189");

let get = util.promisify(client.get).bind(client);
let set = util.promisify(client.set).bind(client);
let hmset = util.promisify(client.hmset).bind(client);
let hget = util.promisify(client.hget).bind(client);
let hgetall = util.promisify(client.hgetall).bind(client); 
let rpush = util.promisify(client.rpush).bind(client);
let lrange = util.promisify(client.lrange).bind(client);
let incr = util.promisify(client.incr).bind(client);
// client.flushall()

const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const PORT = process.env.PORT || 3001;

const clientMethods = {
  get,
  set,
  hmset,
  hgetall,
  hget,
  incr,
  rpush,
  lrange
}

async function startApolloServer() {

  const server = new ApolloServer({ typeDefs, resolvers, context:clientMethods });

  await server.start();

  var app = express();
  
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  server.applyMiddleware({app, path:'/graphiql'});
  
  app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html' ));
  });
  
  await new Promise(resolve => app.listen(PORT, resolve));

  console.log(`🚀 Site ready at http://localhost:${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

  return {server, app}
}

startApolloServer();


