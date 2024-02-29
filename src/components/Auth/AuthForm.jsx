import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Link } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import { LOGIN, SIGNUP } from '../../configs/authConfig';

function AuthForm({state}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if(data.email && data.password) { 
            if(state=== LOGIN) {
                signInWithEmailAndPassword(auth, data.email, data.password)     
                .catch((error) => {
                    console.log(error);
                });
            } else if (state=== SIGNUP) {
                createUserWithEmailAndPassword(auth, data.email, data.password)     
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { state === SIGNUP && "SIGN UP"}
              { state === LOGIN && "LOG IN"}
            </Button>
          </Box>
    );
}

export default AuthForm;