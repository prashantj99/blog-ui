import { Container, Typography, Box, Divider, Avatar, Grid, Link } from '@mui/material';

const ShowBlog = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Why I Keep Failing Candidates During Google Interviews...
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar alt="Author" src="/path/to/avatar.jpg" sx={{ mr: 2 }} />
          <Typography variant="body1">D.T.</Typography>
        </Box>
        <Divider />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" paragraph>
            I have spent the last 6 years conducting hundreds of interviews at Google. During this time, I've developed a keen sense of what works and what doesn't...
          </Typography>
          <Typography variant="body1" paragraph>
            The first mistake many candidates make is not understanding the role they are applying for...
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            1. Understanding the Role
          </Typography>
          <Typography variant="body1" paragraph>
            Many candidates fail because they do not have a clear understanding of the job description...
          </Typography>
          {/* Add more sections and paragraphs as needed */}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" component="h3" gutterBottom>
          More From Medium
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Link href="#" underline="none">
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Avatar src="/path/to/image1.jpg" sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                  <Typography variant="body1" component="p">
                    Grit: The Key to Success at Google
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    J.D., Mar 1, 2023
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link href="#" underline="none">
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Avatar src="/path/to/image2.jpg" sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                  <Typography variant="body1" component="p">
                    Navigating the Tech Industry
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    L.P., Apr 12, 2023
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
          {/* Add more recommended articles as needed */}
        </Grid>
      </Box>
    </Container>
  );
};

export default ShowBlog;
