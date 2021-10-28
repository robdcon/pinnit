require('dotenv').config();
const cors = require('cors')
const express = require("express");
const { dirname } = require("path");
const path = require('path');
const { promisify } = require("util");
const { ApolloServer } = require('apollo-server-express');
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');
const redis = require("redis");
bootstrapGlobalAgent();
const { auth, requiresAuth  } = require('express-openid-connect');

const client = redis.createClient(process.env.REDIS_URL,
{
  tls: {
      rejectUnauthorized: false
  }
});

client.on("error", function (err) {
  console.log("Error " + err);
});

// Redis client methods
let get = promisify(client.get).bind(client);
let set = promisify(client.set).bind(client);
let del = promisify(client.del).bind(client);
let hset = promisify(client.hset).bind(client);
let hmset = promisify(client.hmset).bind(client);
let hget = promisify(client.hget).bind(client);
let hgetall = promisify(client.hgetall).bind(client); 
let rpush = promisify(client.rpush).bind(client);
let lpush = promisify(client.lpush).bind(client);
let rpop = promisify(client.rpop).bind(client);
let lrange = promisify(client.lrange).bind(client);
let incr = promisify(client.incr).bind(client);
let hdel = promisify(client.hdel).bind(client);
let lpos = promisify(client.lpos).bind(client);
let lrem = promisify(client.lrem).bind(client);
let sadd = promisify(client.sadd).bind(client);
let zrange = promisify(client.zrange).bind(client);
let smembers = promisify(client.smembers).bind(client);
let sismember = promisify(client.sismember).bind(client);
let exists = promisify(client.exists).bind(client);
let zadd = promisify(client.zadd).bind(client);

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
  lrem,
  lpush,
  sadd,
  smembers,
  sismember,
  zrange,
  exists,
  zadd
}

// client.flushall()

const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const PORT = process.env.PORT || 3001;

const config = {
  auth0Logout: true,
  authRequired: false,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_URL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  clientSecret: process.env.AUTH0_SECRET,
  routes: {
    // Override the default login route to use your own login route as shown below
    login: false,
    // Pass a custom path to redirect users to a different
    // path after logout.
    postLogoutRedirect: '/user-logout',
  }
};

async function startApolloServer() {
  
  const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => ({ 
    clientMethods,
    user: () => req.oidc.user.email
  })});
  
  await server.start();
  
  var app = express();
  
  

  app.use(auth(config));

  server.applyMiddleware({app, path:'/graphiql'});
  
  app.use(cors());

  
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  // app.get('/user-logout', (req, res, next) => {
    //   res.send('You are logged out.')
    // });
    
  app.get('/login', (req, res) => {
    res.oidc.login({ returnTo: '/' })
  });
  
  app.get('/profile', (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  
  app.use('/', requiresAuth(), express.static(path.resolve(__dirname, '../client/build')));
  
  
  await new Promise(resolve => app.listen(PORT, resolve));

  console.log(`🚀 Site ready at http://localhost:${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

  return {server, app}
}

startApolloServer();


