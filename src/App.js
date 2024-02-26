import React from 'react';
import { ApolloProvider } from '@apollo/client'
import apolloClient from './ApolloSetup';
import {UserPage} from './UserPage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div><UserPage/></div>
    </ApolloProvider>
  );
}

export default App;