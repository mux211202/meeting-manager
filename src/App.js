import React from 'react';
import { ApolloProvider } from '@apollo/client'
import apolloClient from './ApolloSetup';
import {UserPage} from './pages/UserPage';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <UserPage/>
        </Container>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;