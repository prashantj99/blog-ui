import { Box, Chip, Stack, Typography } from '@mui/material';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../commons/AppConstant';
import JsonToHtmlParser from '../commons/JsonToHtmlParser';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import calculateReadTime from '../utils/calculate_read_time';
import formatRelativeTime from '../utils/date_formatter';

const BlogPost = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchBlog = async () => {
      try {
        const BLOG_ID = id;
        const response = await axiosPrivate.get(`/post/${BLOG_ID}`, { signal });
        const { postId, title, content, bannerUrl, draft, lastUpdated, description, categoryDT, tags, user } = response.data;
        setBlog({
          blogId: postId,
          title: title,
          description: description,
          content: JSON.parse(content),
          prevBanner: bannerUrl,
          banner: `${BASE_URL}/file/name/${bannerUrl}`,
          categoryId: parseInt(categoryDT?.categoryId),
          categoryName: categoryDT?.title,
          tags: tags,
          draft: draft,
          lastUpdated: lastUpdated,
          user: user,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log('Error fetching blog:', error);
        }
      }
    };

    fetchBlog();

    return () => {
      controller.abort();
    };

  }, []);

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
          <img src={blog?.banner} alt='banner' width="100%" height={600}/>
          <Typography variant="h5" color="text.secondary" m={2}>
            {blog?.description}
          </Typography>
        </Box>
        <Box sx={{width:'80%'}}>
          <JsonToHtmlParser editorJsData={ blog?.content ? blog?.content : []} />
        </Box>
        <Stack direction="row" spacing={2} m={2}>
          {blog?.tags && blog?.tags.map(({id, name}) => (
            <Chip
              key={id}
              label={name}
              sx={{cursor:'pointer', backgroundColor:'#f5f5f5', fontSize:'18px'}}
              variant="outlined" // You can use "filled" if you prefer a solid background
            />
          ))}
        </Stack>
      </Stack>
      
    </>
  );
};

export default BlogPost;
