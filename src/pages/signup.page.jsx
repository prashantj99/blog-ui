import { useNavigate } from 'react-router-dom';
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Typography,
  Stack,
  Box,
  Grid,
  styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

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

const Signup = () => {
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.currentTarget);
    const authDetails = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      repeatPassword: formData.get('repeatPassword'),
    };

    console.log('Form Data:', authDetails);
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!authDetails.email.length) {
      return toast.error("enter email!!!");
    }

    if (!emailRegex.test(authDetails.email)) {
      return toast.error("email is invalid")
    }

    if (!passwordRegex.test(authDetails.password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
    }

    if (authDetails.password != authDetails.repeatPassword) {
      return toast.error("repeat password is different!!!")
    }
    //SERVER REQUEST
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/auth/signup", authDetails)
      .then(({ data }) => {
        console.log(data);
        toast.success('account created 😊😊😊');
        setTimeout(()=>{
          navigate('/login');
        }, 1000);
      })
      .catch(({ response }) => {
        console.log("signup failed!!!");
        toast.error(response);
      })
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
            <Typography component="h1" variant="h5">Sign Up</Typography>
          </Stack>
          <FormBody noValidate onSubmit={handleSubmit}>
            {/* Username input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            {/* Email input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            {/* Password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            {/* Repeat password input */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              autoComplete="new-password"
            />
            {/* Signup button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '3px 0px 2px' }}
            >
              Sign Up
            </Button>
            {/* Signup with Google and GitHub options */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Sign up with Google
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Sign up with GitHub
                </Link>
              </Grid>
            </Grid>
          </FormBody>
        </FormWrapper>
        {/* Footer */}
        {/* Link for already have an account */}
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account? <Link href="/login" variant="body2">Sign In</Link>
          </Typography>
        </Box>
      </Container>
    </Wrapper>
  );
};


export default Signup;
