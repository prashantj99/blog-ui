import { List, ListItem, ListItemText, Button, Typography, Box, IconButton, ListItemAvatar} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import useBlogCategory from '../hooks/useBlogCategory';
import { useEffect } from 'react';

const TopicsList = () => {
    const {categories} = useBlogCategory();
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: 'auto', mt: 4, mb: 4 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Topics to follow
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Explore topics" />
                </ListItem>
                {categories.sort((a, b)=> a.categoryTitle.localeCompare(b.categoryTitle)).slice(0, 5).map((category) => (
                    <ListItem key={category.categoryId}>
                        <IconButton edge='start'><ArticleIcon /></IconButton>
                        <ListItemText primary={category.categoryTitle} secondary={`${category.categoryDescription} ・ ${'100K stories'}`} />
                        <ListItemAvatar>
                            <Button variant="contained" color="success" sx={{ borderRadius: '22px', fontSize: '10px' }}>
                                Follow
                            </Button>
                        </ListItemAvatar>
                    </ListItem>
                ))}
                <ListItem>
                    <Link href="#" sx={{ marginTop: '16px', display: 'block', textDecoration: 'none', color: 'primary.main' }}>
                        See more topics
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
};
export default TopicsList;
