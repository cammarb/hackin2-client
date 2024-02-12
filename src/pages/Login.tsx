import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await login({
        username: user,
<<<<<<< HEAD
        password: password,
      }).unwrap()
      console.log(userData)
      dispatch(setCredentials({ ...userData, user }))
      setUser('')
      setPassword('')
      navigate('/account')
    } catch (err) {
      console.log(err)
    }
  }
=======
        password: password
      }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser('');
      setPassword('');
      navigate('/account');
    } catch (err) {
      console.log(err);
    }
  };
>>>>>>> dev_melvin

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
<<<<<<< HEAD
            alignItems: 'center',
=======
            alignItems: 'center'
>>>>>>> dev_melvin
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      )}
    </Container>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> dev_melvin
}
