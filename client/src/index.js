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
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import { setContext } from '@apollo/client/link/context';
import { tokenVar } from './cache';
import Theme from './themes/Theme';
import { ThemeProvider } from "styled-components";

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === "Development" ? 'http://localhost:3001/graphiql': 'https://pinnit-server.vercel.app/graphiql'
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
    domain="auth0-robdcon.eu.auth0.com"
    clientId="7lZI6Q3bw0XwO3jPY1hGCodXFxgLSZNO"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </Auth0Provider>
);

// serviceWorker.register();
serviceWorker.unregister();
