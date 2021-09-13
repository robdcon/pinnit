require('dotenv').config();
const express = require("express");
const { dirname } = require("path");
const util = require('util');
const path = require('path');
const { promisify } = require("util");
const { ApolloServer } = require('apollo-server-express');
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');
const redis = require("redis");
bootstrapGlobalAgent();
console.log("REDIS CIENT:",process.env.REDIS_URL)
const client = redis.createClient(process.env.REDIS_URL,
{
  tls: {
      rejectUnauthorized: false
  }
});

client.on("error", function (err) {
  console.log("Error " + err);
});
let get = util.promisify(client.get).bind(client);
let set = util.promisify(client.set).bind(client);
let del = util.promisify(client.del).bind(client);
let hset = util.promisify(client.hset).bind(client);
let hmset = util.promisify(client.hmset).bind(client);
let hget = util.promisify(client.hget).bind(client);
let hgetall = util.promisify(client.hgetall).bind(client); 
let rpush = util.promisify(client.rpush).bind(client);
let rpop = util.promisify(client.rpop).bind(client);
let lrange = util.promisify(client.lrange).bind(client);
let incr = util.promisify(client.incr).bind(client);
let hdel = util.promisify(client.hdel).bind(client);
let lpos = util.promisify(client.lpos).bind(client);
let lrem = util.promisify(client.lrem).bind(client);
// client.flushall()

const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const PORT = process.env.PORT || 3001;

const clientMethods = {
  get,
  set,
  del,
  hmset,
  hgetall,
  hget,
  hset,
  hdel,
  incr,
  rpush,
  rpop,
  lrange,
  lpos,
  lrem
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


