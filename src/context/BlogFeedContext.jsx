import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from '/src/api/axios';

const BlogFeedContext = createContext({});

const BlogFeedProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    axios.get(`/post/page?pageNumber=${page}&pageSize=10`)
    .then(response => {
        console.log(response.data);
        setBlogs(prevBlogs => {
          return [...new Set([...prevBlogs, ...response.data.content])]
        });
        setHasMore(!response.data.isLastPage);
        setLoading(false);
    })
    .catch(error => {
        console.error("Error fetching blogs", error);
        setLoading(false);
    });
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
