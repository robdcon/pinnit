const cors = require('cors')
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const client = require('./datasources/database');
var { createHandler } = require("graphql-http/lib/use/express")

// const { bootstrap: bootstrapGlobalAgent } = require('global-agent');
// const redis = require("redis");
// bootstrapGlobalAgent();
// const { auth, requiresAuth  } = require('express-openid-connect');

// var axios = require("axios").default;

// var options = {
//   method: 'PATCH',
//   url: 'https://YOUR_DOMAIN/api/v2/tenants/settings',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer API2_ACCESS_TOKEN',
//     'cache-control': 'no-cache'
//   },
//   data: {flags: {enable_dynamic_client_registration: true}}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

// const client = redis.createClient(process.env.REDIS_URL,
// {
//   tls: {
//       rejectUnauthorized: false
//   }
// });

// client.on("error", function (err) {
//   console.log("Error " + err);
// });


const resolvers = require('./resolvers');
const typeDefs = require('./schema');


const PORT = process.env.PORT || 3001;

// const config = {
//   auth0Logout: true,
//   authRequired: false,
//   secret: process.env.AUTH0_SECRET,
//   baseURL: process.env.AUTH0_URL,
//   clientID: process.env.AUTH0_CLIENTID,
//   issuerBaseURL: process.env.AUTH0_DOMAIN,
//   clientSecret: process.env.AUTH0_SECRET,
//   routes: {
//     // Override the default login route to use your own login route as shown below
//     login: false,
//     // Pass a custom path to redirect users to a different
//     // path after logout.
//     postLogoutRedirect: '/user-logout',
//   }
// };

async function startApolloServer() {
  
  const server = new ApolloServer({ typeDefs, resolvers, context: client});
  
  await server.start();
  
  var app = express();

  var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // <-- REQUIRED backend setting
  };
  
  app.use(cors(corsOptions));
  
  
  // app.use(auth(config));
  
  // // app.get('/', (req, res) => res.send('Home Screen'));
  // app.use(requiresAuth(), express.static(path.resolve(__dirname, '../client/build')))
  
  // app.get('/profile', requiresAuth(),  (req, res) => {
  //   // console.log('OIDC:', req.oidc.idToken)
  //   res.send(JSON.stringify(req.oidc.user));
  // });

  // app.use('/login', cors(), (req, res, next) => {
  //   res.oidc.login({ returnTo: '/boards' })
  // });
  
  // app.use('/user-logout', cors(), (req, res, next) => {
  //     res.send('You are logged out.')
  // });

  app.use("/", (res, req) => {
    res.send("Server is running");
  })

  server.applyMiddleware({app, path:'/graphiql'});
  
  await new Promise(resolve => app.listen(PORT, resolve));
  
  console.log(`🚀 Site ready at http://localhost:${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

  return {server, app}
}

startApolloServer();


