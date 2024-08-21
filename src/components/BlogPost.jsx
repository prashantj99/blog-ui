import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import JsonToHtmlParser from '../commons/JsonToHtmlParser';
import calculateReadTime from '../utils/calculate_read_time';
import formatRelativeTime from '../utils/date_formatter';
import useReadMoreBlog from '../hooks/useReadMoreBlog';
import Comments from './Comments';
import UserProfileCard from './UserProfileCard ';
import { Comment, Close } from '@mui/icons-material';

const BlogPost = () => {
  const { blog } = useReadMoreBlog();
  console.log(blog);
  
  const navigate = useNavigate();
  const handleProfileLinkClick = () => {
    navigate(`/public/profile/${blog?.user?.userId}`);
  };
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <>
      <Stack spacing={2} justifyContent={'center'} alignItems={'center'} m={10}>
        <Typography variant="h4" component="div" align="center">
          {blog?.title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {blog?.user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            •
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {calculateReadTime(blog?.content)} min read
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • {blog?.lastUpdated && formatRelativeTime(blog?.lastUpdated)}
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, width: '80%' }}>
          <UserProfileCard user={blog?.user}>
            <Typography variant='a' padding={1} onClick={handleProfileLinkClick} sx={{ cursor: 'pointer' }}>
              {blog?.user?.name}
            </Typography>
          </UserProfileCard>
          <Box padding={2}>
            <IconButton aria-label="comments" onClick={toggleComments}>
              <Comment color="primary" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ width: '80%' }}>
          <img src={blog?.banner} alt="banner" width="100%" style={{ maxHeight: '500px', objectFit: 'cover' }} />
          <Typography variant="body1" color="text.secondary" m={2} align="center">
            {blog?.description}
          </Typography>
        </Box>
        <Box sx={{ width: '80%' }}>
          <JsonToHtmlParser editorJsData={blog?.content ? blog?.content : []} />
        </Box>
        <Stack direction="row" spacing={1} m={2}>
          {blog?.tags && blog?.tags.map(({ id, name }) => (
            <Chip
              key={id}
              label={name}
              color="default"
              variant="outlined"
              sx={{ fontSize: '12px' }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '500px',
          height: '100%',
          backgroundColor: 'white',
          borderLeft: '1px solid #ddd',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          display: showComments ? 'block' : 'none',
          zIndex: 1300, // Ensure it's on top of other elements
          overflowY: 'auto',
          transition: '0.3s ease',
          padding: 5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            aria-label="close"
            onClick={toggleComments}
            sx={{ color: 'text.primary' }}
          >
            <Close />
          </IconButton>
        </Box>
        {blog && <Comments postId={blog?.id} />}
      </Box>
    </>
  );
};

export default BlogPost;
