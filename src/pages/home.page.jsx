import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Box, CssBaseline, Stack } from '@mui/material';
import PrimaryNavbar from '../components/PrimaryNavbar';

export default function Home() {
  return (
    <Box>
      <CssBaseline />
      <PrimaryNavbar />
      <Stack spacing={2} justifyContent='space-between' direction='row'>
        <Sidebar/>
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  )
}
