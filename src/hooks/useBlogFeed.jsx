import { useContext } from 'react';
import { BlogFeedContext } from '../context/BlogFeedContext.jsx';

const useBlogFeed = () => useContext(BlogFeedContext);

export default useBlogFeed;