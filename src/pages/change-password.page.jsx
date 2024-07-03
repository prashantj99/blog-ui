import React, { useContext, useRef } from 'react';
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
  styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../components/AuthProvider';

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

const ChangePasswordPage = () => {
  let {userAuth, setUserAuth} = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!sessionStorage.getItem('password_reset_token')){
        navigate('/reset_password');
    }
    const formData = new FormData(event.currentTarget);
    const authDetails = {
      new_password: formData.get('new_password'),
      repeat_password: formData.get('repeat_password'),
      token: userAuth.forgotPasswordToken,
    };
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!passwordRegex.test(authDetails.new_password)) {
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
    }
    if (authDetails.new_password != authDetails.repeat_password) {
      return toast.error("password mismatch!!!")
    }

    //SERVER REQUEST
    sessionStorage.removeItem('password_reset_token');
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/forgotpassword/change_password", authDetails)
      .then(({ data }) => {
        setUserAuth({...userAuth, forgotPasswordToken:null});
        navigate('/login');
      })
      .catch(({ response }) => {
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
            <Typography component="h1" variant="h5">Change Password</Typography>
          </Stack>
          <FormBody noValidate onSubmit={handleSubmit}>
            {/* Password input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new_password"
              label="New Password"
              type="password"
              id="password1"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeat_password"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: '3px 0px 2px' }}
            >
              sumbit
            </Button>
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

export default ChangePasswordPage;