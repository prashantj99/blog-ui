import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const BlogFeedContext = createContext({});

const BlogFeedProvider = ({ children }) => {
  const pageSize = 10;
  
  const axiosPrivate = useAxiosPrivate();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const {auth} =  useAuth();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try{
        const url = `/post/page?pageNumber=${page}&pageSize=${pageSize}`;
        const response = await axiosPrivate.get(url, {
          headers:{
            'Authorization' : `Bearer ${auth?.accessToken}`,
          }
        });
        
        console.table(response.data.posts);

        setBlogs(prevBlogs => {
          return [...new Set([...prevBlogs, ...response.data.posts])]
        });
        
        setHasMore(!response.data.isLastPage);
        setLoading(false);
        
      }catch(err){
        console.error("Error fetching blogs", err);
        setLoading(false);
      }
  }, [page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <BlogFeedContext.Provider value={{ blogs, hasMore, loading, fetchBlogs, incrementPage }}>
      {children}
    </BlogFeedContext.Provider>
  );
};

BlogFeedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BlogFeedContext, BlogFeedProvider };
