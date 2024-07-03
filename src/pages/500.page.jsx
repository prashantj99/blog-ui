import { Container, Typography, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function InternalServerError() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >  
        <img src='/src/assets/500.png'></img>
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant="h1" component="div" gutterBottom>
                500 
            </Typography>
            <Button variant="contained" color="primary" href="/" size='sm'>
                Home
            </Button>
        </Box>
          {/* <Typography variant="h1" component="div" gutterBottom>
            500
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            Internal Server Error
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, something went wrong on our end. Please try again later.
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Go to Home
          </Button> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default InternalServerError;
