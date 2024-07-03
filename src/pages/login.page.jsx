import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import { storeInLocalStorage } from '/src/commons/session';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import {Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Typography, Stack, Box, Grid, styled,} from '@mui/material';

// Styled components for layout and styling
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#fff"
}));

const FormWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const FormBody = styled("form")(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1)
}));

const Login = () => {
  const navigate = useNavigate();
  const { setUserAuth, setIsAuthenticated} = useAuth();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const authDetails = {
      email: formData.get('email'),
      password: formData.get('password'),
      remember: formData.get('remember') === 'on',
    };

    // Email and password regex for validation
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    // Validate email
    if (!authDetails.email.length) {
      return toast.error("Enter email!!!");
    }

    if (!emailRegex.test(authDetails.email)) {
      return toast.error("Email is invalid");
    }

    // Validate password
    if (!passwordRegex.test(authDetails.password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter");
    }

    // Server request for authentication
    try{
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/auth/signin", authDetails);
        console.log(response)
        setIsAuthenticated(response.status == 200);
        const {accessToken, refreshToken, userDto} = response.data;
        if (authDetails.remember) {
          storeInLocalStorage("user", JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken, ...userDto }));
        }
        sessionStorage.setItem("user", JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken, ...userDto }));
        setUserAuth({ accessToken: accessToken, refreshToken: refreshToken, ...userDto });
        navigate('/user/feed');
      }catch(err){
        if(err.status === 404){
          toast.error("Email or Password is wrong");
        }
    }
  };

  return (
    <Wrapper>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormWrapper>
          <Stack alignItems="center" spacing={2}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Sign in</Typography>
          </Stack>
          <FormBody noValidate onSubmit={handleSubmit}>
            {/* Email input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* Password input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* Remember me checkbox */}
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '3px 0px 2px' }}
            >
              Sign In
            </Button>
            {/* Links for forgotten password and sign up */}
            <Grid container>
              <Grid item xs>
                <Link href="/reset_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </FormBody>
        </FormWrapper>
        {/* Footer */}
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              .blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Login;
