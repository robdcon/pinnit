import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphiql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// serviceWorker.register();
serviceWorker.unregister();
