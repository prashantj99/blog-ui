import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar"
import { Box, CssBaseline, Stack } from '@mui/material';
import UserAccountProvider from "../Providers/UserAccountProvider";

const ProfilePage = () => {
  
  return (
    <>
      <CssBaseline />
      <Stack direction="row" spacing={2}>
        <UserAccountProvider>
          <ProfileSidebar />
          <Box sx={{ flexGrow: 1, p: 10 }}>
            <Outlet />
          </Box>
        </UserAccountProvider>
      </Stack>
    </>
  )
}

export default ProfilePage
