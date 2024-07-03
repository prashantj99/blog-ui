import { Publish, Save } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar, Typography, styled, CircularProgress } from '@mui/material';
import { ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog.jsx';

const CustomIconButton = styled(Button)({
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

const Icons = styled(Box)({
    display: 'flex',
    justifyContent: 'space-around',
});

const StyledToolbar = styled(Toolbar)({
    display: { xs: 'none', sm: 'flex' },
    justifyContent: 'space-between',
});

export default function EditorNavBar() {
    
    const navigate = useNavigate();
    const { blogState, setBlogState, blogState:{title}, handleSaveDraft, isSaving} = useBlog();
    
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
            <ToastContainer />
            <StyledToolbar>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img
                        src="/src/assets/logo.png"
                        alt="Logo"
                        style={{ height: '20px', marginRight: '20px', cursor: 'pointer' }}
                        onClick={() => navigate('/user/feed')}
                    />
                </Typography>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {title || 'New Blog'}
                </Typography>
                <Icons>
                    <CustomIconButton edge="start" startIcon={<Save />} color="inherit" aria-label="save" onClick={handleSaveDraft} disabled={isSaving}>
                        {isSaving ? <CircularProgress size={24} color="inherit" /> : 'SAVE DRAFT'}
                    </CustomIconButton>
                    <Button variant="contained" color={'primary'} startIcon={<Publish />} style={{ marginLeft: 'auto' }} onClick={()=> {
                        setBlogState(prev => {
                            return {...prev, draft: false};
                        })
                        console.log(blogState);
                        handleSaveDraft();
                    }}>
                        Publish
                    </Button>
                </Icons>
            </StyledToolbar>
        </AppBar>
    );
}
