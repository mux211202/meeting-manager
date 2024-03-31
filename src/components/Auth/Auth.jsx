import React,  {useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TabPanel from '../TabPanel/TabPanel.jsx';
import { Tab, Tabs } from '@mui/material';
import { LOGIN, SIGNUP } from '../../configs/authConfig.js';
import AuthForm from './AuthForm.jsx';

const defaultTheme = createTheme();

export default function SignIn() {
    const [tabValue, setTabValue] = useState(LOGIN);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            { tabValue === SIGNUP && "SIGN UP"}
            { tabValue === LOGIN && "LOG IN"}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Log in" value={LOGIN}/>
                    <Tab label="Sign up" value={SIGNUP}/>
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={LOGIN}>
                <AuthForm state={LOGIN}/>
            </TabPanel>
            <TabPanel value={tabValue} index={SIGNUP}>
                <AuthForm state={SIGNUP}/>
            </TabPanel>
        </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}