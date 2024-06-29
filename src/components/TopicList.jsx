import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Box, ListItemIcon, IconButton, ListItemAvatar, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

const topics = [
    { name: 'Software Development', stories: '289K Stories', writers: '94K Writers' },
    { name: 'Books', stories: '377K Stories', writers: '102K Writers' },
    { name: 'Technology', stories: '1.5M Stories', writers: '463K Writers' },
    { name: 'Deep Learning', stories: '107K Stories', writers: '36K Writers' },
    { name: 'Web Development', stories: '281K Stories', writers: '106K Writers' },
];

const TopicsList = () => {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', margin: 'auto', mt: 4, mb: 4 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Topics to follow
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Explore topics" />
                </ListItem>
                {topics.map((topic, index) => (
                    <ListItem key={index}>
                        <IconButton edge='start'><ArticleIcon /></IconButton>
                        <ListItemText primary={topic.name} secondary={`${topic.stories} ・ ${topic.writers}`} />
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
