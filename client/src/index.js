import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './registerServiceWorker';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './cache.js';

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3001/graphiql',
  connectToDevTools: true
})

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// serviceWorker.register();
serviceWorker.unregister();
