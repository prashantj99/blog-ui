import React, { useContext, useState } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Badge,
    TextField,
    Menu,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { Mail, Notifications, Edit } from '@mui/icons-material';
import { UserContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../commons/session';
const Logo = styled('img')({
    height: '40px',
    marginRight: '20px',
});
const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '20px',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}));

const UserProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}));

const Search = styled('div')(({ theme }) => ({
    flexGrow: 1
}));

export default function PrimaryNavbar() {
    const navigate = useNavigate();
    const { userAuth: { name }, setUserAuth } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // Set anchorEl to the current target element
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu by setting anchorEl to null
    };

    //handle logout
    const handleLogout = (e)=>{
        handleMenuClose(e);
        logOutUser();
        sessionStorage.clear();
        setUserAuth(null);
    }
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
            <Toolbar>
                <Logo src="/src/assets/logo.png" alt="Logo" />
                <Search>
                    <TextField placeholder='Search Blogs...' sx={{ width: '30%' }} />
                </Search>
                <Icons>
                    <Badge color='error' sx={{ cursor: 'pointer' }} onClick={e => { navigate('/user/editor') }}>
                        <Edit />
                    </Badge>
                    <Badge badgeContent={4} color='error' sx={{ cursor: 'pointer' }}>
                        <Mail />
                    </Badge>
                    <Badge badgeContent={3} color='error' sx={{ cursor: 'pointer' }}>
                        <Notifications />
                    </Badge>
                    <IconButton color='inherit' onClick={handleMenuOpen}>
                        <Avatar src='/src/assets/logo.png' sx={{ width: 30, height: 30, cursor:'pointer' }} />
                    </IconButton>
                </Icons>
                <UserProfileBox onClick={handleMenuOpen}>
                    <Avatar src='/src/assets/logo.png' sx={{ width: 30, height: 30, cursor:'pointer' }}/>
                    <Typography variant='span'>{name}</Typography>
                </UserProfileBox>
                <Menu
                    id="demo-positioned-menu"
                    anchorEl={anchorEl} // set anchorEl prop
                    open={Boolean(anchorEl)} // open the menu if anchorEl is not null
                    onClose={handleMenuClose} // close the menu
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem onClick={e => { handleLogout(e); }}>Logout</MenuItem> {/* Close menu on logout */}
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
