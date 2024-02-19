import React from 'react';
import { ApolloProvider } from '@apollo/client'
import apolloClient from './ApolloSetup';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div>hello</div>
    </ApolloProvider>
  );
}

export default App;