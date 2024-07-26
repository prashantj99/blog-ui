import Box from '@mui/material/Box/Box.js';
import { AppBar, Button, Toolbar, Typography, styled, CircularProgress } from '@mui/material';
import { ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog.jsx';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ScheduleIcon from '@mui/icons-material/Schedule';

const CustomIconButton = styled(Button)({
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
    borderRadius:10,
});

const Icons = styled(Box)({
    minWidth:'200px',
    display: 'flex',
    justifyContent: 'space-around',
});

const StyledToolbar = styled(Toolbar)({
    display: { xs: 'none', sm: 'flex' },
    justifyContent: 'space-between',
});

export default function EditorNavBar() {
    
    const navigate = useNavigate();
    const { setBlogState, blogState:{title}, handleSaveDraft, isSaving} = useBlog();
    
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', color: 'black' }}>
            <ToastContainer />
            <StyledToolbar>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img
                        src="/src/assets/logo.png"
                        alt="Logo"
                        style={{ height: '20px', marginRight: '20px', cursor: 'pointer' }}
                        onClick={() => navigate('/feed')}
                    />
                </Typography>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {title || 'Untitled Blog'}
                </Typography>
                <Icons>
                    <CustomIconButton edge="start" startIcon={<ScheduleIcon />} color="inherit" aria-label="draft" onClick={()=>{
                        setBlogState((prev) => {
                            return {...prev, draft: true};
                        })
                        handleSaveDraft(true);
                    }} disabled={isSaving}>
                        {isSaving? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </CustomIconButton>
                    <Button variant="contained" color={'primary'} startIcon={<PublishedWithChangesIcon />} style={{ marginLeft: 'auto', borderRadius:10 }} onClick={()=> {
                        setBlogState((prev) => {
                            return {...prev, draft: false};
                        })
                        handleSaveDraft(false);
                    }} disabled={isSaving}>
                        {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Publish'}
                    </Button>
                </Icons>
            </StyledToolbar>
        </AppBar>
    );
}
