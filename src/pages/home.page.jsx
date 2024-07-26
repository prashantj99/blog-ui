import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Box, CssBaseline, Stack } from '@mui/material';
import { BlogFeedProvider } from '../context/BlogFeedContext.jsx';

const Home = () => {
  return (
    <Box>
        <CssBaseline />
        <BlogFeedProvider>
          <Stack spacing={2} justifyContent='space-between' direction='row'>
            <Sidebar />
            <Feed />
            <Rightbar />
          </Stack>
        </BlogFeedProvider>
      </Box>
  )
}

export default Home;
