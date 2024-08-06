import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Chip, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useBlogCategory from '../hooks/useBlogCategory';
import { SUBSCRIBE_TOPIC_URL, FETCH_BLOGS_URL } from '../commons/AppConstant';
import InternalServerError from '../pages/500.page'; // Import the error component

const TopicPage = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const {categories} = useBlogCategory();
    const [topic, setTopic] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null); 
    const scrollRef = useRef(null);

    // Fetch topic data and blogs
    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                // Fetch topic details
                const { data } = await axiosPrivate.get(`/category/${id}`);
                console.log(data);
                setTopic(data.topic);
                setIsFollowing(data.subscribers.includes(auth.id));

                // Fetch blogs for the topic
                const blogsResponse = await axiosPrivate.get(`${FETCH_BLOGS_URL}/${id}/posts`);
                setBlogs(blogsResponse.data.blogs);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError(error); // Set error state
                console.error(error);
            }
        };

        fetchTopicData();
    }, [id, axiosPrivate]);

    // Memoized function to handle follow/unfollow
    const handleFollowClick = useCallback(async () => {
        const action = isFollowing ? 'unfollow' : 'follow';
        try {
            await axiosPrivate.post(SUBSCRIBE_TOPIC_URL, {
                userId: auth.id,
                topicId: id,
                action
            });
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error(error);
        }
    }, [axiosPrivate, auth.id, id, isFollowing]);

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };

    if (error) {
        return <InternalServerError />;
    }

    if (!topic) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Explore Topics
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f1f1f1' }}>
                <IconButton onClick={() => scroll(-200)}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Box sx={{ display: 'flex', overflow: 'hidden', flexWrap: 'nowrap', gap: '10px', padding: '10px', flex: 1 }} ref={scrollRef}>
                    {categories.map((cat) => (
                        <Chip key={cat.categoryId} label={cat.title} clickable sx={{ fontSize: '16px' }} />
                    ))}
                </Box>
                <IconButton onClick={() => scroll(200)}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" component="h2">
                    {topic.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Topic · {topic.description} Followers · {'1.2K'} Stories
                </Typography>
                <Button 
                    variant="contained"
                    color={isFollowing ? 'default' : 'success'}
                    sx={{ marginTop: '20px', display: 'block', margin: '0 auto' }}
                    onClick={handleFollowClick}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Box sx={{ marginTop: '20px' }}>
                    {blogs.length > 0 ? (
                        blogs.map(blog => (
                            <Box key={blog.id} sx={{ marginBottom: '10px' }}>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {blog.description}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No blogs available</Typography>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default TopicPage;
