import { useEffect, useRef, useCallback } from 'react';
import Box from '@mui/material/Box/Box';
import Blog from './Blog'; 
import useBlogFeed from '../hooks/useBlogFeed'

const Feed = () => {
  const { blogs, hasMore, loading, fetchBlogs, incrementPage } = useBlogFeed();
  const observer = useRef();

  const lastBlogElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        incrementPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, incrementPage]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <Box flex={4} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      {blogs.map((blog, index) => {
        if(index == 0) console.table(blog);
        if (blogs.length === index + 1) {
          return <div ref={lastBlogElementRef} key={blog.postId}><Blog key={index} blog={blog} /></div>
        } else {
          return <Blog key={index} blog={blog} />
        }
      })}
      {loading && <p>Loading...</p>}
    </Box>
  );
};

export default Feed;
