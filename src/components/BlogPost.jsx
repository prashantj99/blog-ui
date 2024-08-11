import { Box, Chip, Stack, Typography } from '@mui/material';
import JsonToHtmlParser from '../commons/JsonToHtmlParser';
import calculateReadTime from '../utils/calculate_read_time';
import formatRelativeTime from '../utils/date_formatter';
import useReadMoreBlog from '../hooks/useReadMoreBlog';

const BlogPost = () => {
  const { blog } = useReadMoreBlog();
  return (
    <>
      <Stack spacing={2} justifyContent={'center'} alignItems={'center'} m={10}>
        <Typography variant="h3" component="div">
          {blog?.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 1 }}>
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
        <Box sx={{ width: '80%' }}>
          <img src={blog?.banner} alt='banner' width="100%" height={600} />
          <Typography variant="h5" color="text.secondary" m={2}>
            {blog?.description}
          </Typography>
        </Box>
        <Box sx={{ width: '80%' }}>
          <JsonToHtmlParser editorJsData={blog?.content ? blog?.content : []} />
        </Box>
        <Stack direction="row" spacing={2} m={2}>
          {blog?.tags && blog?.tags.map(({ id, name }) => (
            <Chip
              key={id}
              label={name}
              color='default'
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default BlogPost;
