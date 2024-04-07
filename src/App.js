import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client'
import apolloClient from './ApolloSetup';
import {UserPage} from './pages/UserPage';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Auth from './components/Auth/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './configs/firebaseConfig';
import AuthDetails from './components/Auth/AuthDetails';

function App() {
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthDetails authUser={authUser}/>
        <Container maxWidth="lg">
          { authUser?.email ? <UserPage user={authUser}/> : null }
          { !authUser?.email ? <Auth/> : null }
        </Container>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;