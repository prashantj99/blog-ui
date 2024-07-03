import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingPage = () => {
    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography variant="h5" gutterBottom>
                <img src='/src/assets/logo.png' alt='.blog'/>
            </Typography>
            <Box display="flex" alignItems="center">
                <CircularProgress color="primary" size={50} thickness={5} />
                <Typography variant="h6" gutterBottom style={{ marginLeft: '10px' }}>
                    Loading
                </Typography>
            </Box>
        </Box>
    );
};

export default LoadingPage;
