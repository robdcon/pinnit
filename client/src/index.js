require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
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
import { setContext } from '@apollo/client/link/context';
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
  link : concat(authMiddleware, httpLink),
  connectToDevTools: true
})

ReactDOM.render(
  <Auth0Provider
    domain="auth0-robdcon.eu.auth0.com"
    clientId="7lZI6Q3bw0XwO3jPY1hGCodXFxgLSZNO"
    redirectUri={window.location.origin}
  >
   <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);

// serviceWorker.register();
serviceWorker.unregister();
