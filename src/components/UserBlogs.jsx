import { Box, Container} from '@mui/material';
import ArticleCard from './ArticleCards';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { GET_PUBLISHED_BLOGS_URL, GET_DRAFTED_BLOGS_URL } from '../commons/AppConstant';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [page, setPage] = useState(0);
    const [isLastPage, setLastPage] = useState(false);
    const { auth } = useAuth();
    const location = useLocation();
    const { pathname } = location;

    const isDraft = pathname.includes('drafts');
    const fetchUrl = isDraft ? GET_DRAFTED_BLOGS_URL : GET_PUBLISHED_BLOGS_URL;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBlogs = async () => {
            try {
                const URL = `${fetchUrl}/${auth.id}?pageNumber=${page}`;
                const response = await axiosPrivate.get(URL, { signal });
                setLastPage(response.data.isLastPage);
                setBlogs(prev => [...prev, ...response.data.posts]);
            } catch (err) {
                console.error(err);
            }
        };

        if (!isLastPage) fetchBlogs();

        return () => {
            controller.abort();
        };
    }, [page, pathname]);

    const handleInfiniteScroll = async () => {
        try {
            if (!isLastPage &&
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight) {
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => {
            window.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);

    // Reset blogs and page number when URL changes
    useEffect(() => {
        setBlogs([]);
        setPage(0);
        setLastPage(false);
    }, [pathname]);

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                {
                !blogs.length ? 
                <Box sx={{ display: 'flex', mt: 20, width:'100%', justifyContent:'center' , alignItems:'center'}}>
                    <img src='/src/assets/empty_draft.png' alt='empty'/>
                </Box> 
                : blogs.map((blog, index) => (
                    <ArticleCard
                        key={index}
                        category={blog?.category?.title}
                        title={blog?.title}
                        imageUrl={blog?.bannerUrl}
                        description={blog?.description}
                    />
                ))}
            </Box>
        </Container>
    );
}

export default UserBlogs;
