import React, { useContext, useRef, useState } from 'react';
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
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '../commons/AppConstant'
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


export default function ResetPasswordPage() {
    let {userAuth, setUserAuth} = useContext(UserContext);
    const EMAIL_VERIFY = 'EMAIL_VERIFY_FORM';
    const OTP_VERIFY = 'OTP_VERIFY_FORM';

    const [capVal, setCapVal] = useState(null);
    const captcha = useRef(null);
    const navigate = useNavigate();
    const [formType, setFormType] = useState(EMAIL_VERIFY);


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        const authDetails = {
            email: formData.get('email'),
            captcha: captcha.current.getValue(),
            otp: formData.get('otp'),
        };
        captcha.current.reset();
        console.log(authDetails);
        if (!authDetails.email.length) {
            return toast.error("enter email!!!");
        }

        if (!emailRegex.test(authDetails.email)) {
            return toast.error("email is invalid")
        }

        let serverRoute = formType === EMAIL_VERIFY ? "/forgotpassword/verify_email" : "/forgotpassword/verify_otp";
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, authDetails)
            .then(({ data }) => {
                console.log(data);
                if (formType === EMAIL_VERIFY) setFormType(OTP_VERIFY);
                else {
                    setUserAuth({...userAuth, forgotPasswordToken : data});
                    navigate('/user/change_password');
                }
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
                        <Typography component="h1" variant="h5">Reset Password</Typography>
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
                        {
                            formType === EMAIL_VERIFY ? ""
                                :
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="otp"
                                    label="OTP"
                                    type="password"
                                    id="otp"
                                    autoComplete="current-password"
                                />
                        }
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(val) => { setCapVal(val) }}
                            ref={captcha}
                            hidden={formType != EMAIL_VERIFY}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!capVal && formType === EMAIL_VERIFY}
                            sx={{ margin: '3px 0px 2px' }}
                        >
                            {
                                formType === EMAIL_VERIFY ? "Send OTP" : "Verify OTP"
                            }
                        </Button>
                        {/* Links for forgotten password and sign up */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Login
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
    )
}
