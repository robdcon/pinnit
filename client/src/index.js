// require('dotenv').config();
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorker from './registerServiceWorker';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  gql,
  useReactiveVar,
  HttpLink,
  concat
} from '@apollo/client';
import { cache } from './cache.js';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import { setContext } from '@apollo/client/link/context';
import { tokenVar } from './cache';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphiql'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = tokenVar();
  console.log(`Token: ${token}`);
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
  connectToDevTools: true
})

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_CLIENT}
    clientId={process.env.REACT_APP_AUTH0_SECRET}
    redirectUri={process.env.REACT_APP_REDIRECT_URI}
  >
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Auth0Provider>
);

// serviceWorker.register();
serviceWorker.unregister();
