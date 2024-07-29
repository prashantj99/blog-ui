import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box, Stack } from '@mui/material';
import { ExitToApp, Info, PendingActions, Public, Publish, QueryStats } from '@mui/icons-material';
import useLogout from '../hooks/useLogout';

const ProfileSidebar = () => {
  const menuItems = [
    { text: 'Personal Information', icon: <Info />, link: './info' },
    { text: 'Published Blogs', icon: <Publish />, link: './blogs' },
    { text: 'Draft', icon: <PendingActions />, link: './draft' },
    { text: 'Community Stats', icon: <QueryStats />, link: './stats' },
    { text: 'Social Networks', icon: <Public />, link: './accounts' },
  ];
  const logout = useLogout();
  const navigate = useNavigate();

  //handle logout
  const handleLogout = ()=>{
    logout();
    navigate('/login');
  }

  return (
    <Box sx={{ width: '30%' }}>
      <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Avatar
          alt="Denis Holland"
          src="/path-to-avatar.jpg"
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="h6">Denis Holland</Typography>
        <Typography variant="body2">1.2k Followers</Typography>
      </Stack>
      <List>
        {menuItems.map((item, index) => (
          <ListItem component={Link} to={item.link} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem onClick={handleLogout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileSidebar;
