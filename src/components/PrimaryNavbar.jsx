import { useState } from 'react'
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { Mail, Notifications, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CustomSearchBar from './CustomSearchBar';
import useLogout from '../hooks/useLogout'

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

const Search = styled('div')({
    flexGrow: 1,
    border:'none',
});

export default function PrimaryNavbar() {
    const navigate = useNavigate();
    const {logout} = useLogout();
    const { auth: { name, accessToken }} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleMenuClose = () => {
        setAnchorEl(null); 
    };

    //handle logout
    const handleLogout = (e)=>{
        logout();
        navigate('/login');
    }
    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo src="/src/assets/logo.png" alt="Logo" />
                    <Search>
                        <CustomSearchBar/>
                    </Search>
                    {
                        accessToken ? 
                        <>
                            <Icons>
                                <Badge color='error' sx={{ cursor: 'pointer' }} onClick={() => { navigate('/editor') }}>
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
                                anchorEl={anchorEl} 
                                open={Boolean(anchorEl)} // open the menu if anchorEl is not null
                                onClose={handleMenuClose} 
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
                                <MenuItem onClick={e => { handleLogout(e); }}>Logout</MenuItem> 
                            </Menu>
                        </>
                    : 
                    <Icons>
                        <Button variant="contained" 
                            sx={{backgroundColor: '#2c3e50', '&:hover': {backgroundColor: '#2c3e50'}, borderRadius:5}} 
                            onClick={()=>{navigate('/login');}}
                        >
                            Log in
                        </Button>
                        <Button variant="contained" 
                            sx={{color:'black', backgroundColor: '#ecf0f1', '&:hover': {backgroundColor: '#ecf0f1'}, borderRadius:5}}
                            onClick={()=>{navigate('/signup');}}
                        >
                            signup
                        </Button>
                    </Icons>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}
