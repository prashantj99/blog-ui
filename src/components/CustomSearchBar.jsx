import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomSearchBar() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, border:'none', borderRadius:10, boxShadow:'none', backgroundColor:'#ecf0f1' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Blogs, users, articles..."
        inputProps={{ 'aria-label': 'Search Blogs, users, articles...' }}
        autoFocus
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
