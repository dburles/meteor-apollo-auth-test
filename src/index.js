import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import Login from './Login';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      'meteor-login-token': localStorage.getItem('Meteor.loginToken') || null,
    },
  });

  return forward(operation);
});

export const apollo = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

apollo
  .query({
    query: gql`
      {
        me {
          _id
          profile {
            name
          }
        }
      }
    `,
  })
  .then(console.log);

render(
  <ApolloProvider client={apollo}>
    <Login />
  </ApolloProvider>,

  document.getElementById('root'),
);
