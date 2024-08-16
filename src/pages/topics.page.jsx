import ExploreTopicTab from '../components/ExploreTopicTab';
import RecommendedBlogs from '../components/RecomendedBlogs';
import { Button, Stack, Typography } from '@mui/material';
import useCategory from '../hooks/useCategory';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { SUBSCRIBE_TOPIC_URL } from '../commons/AppConstant';

const TopicPage = () => {
    const {topic, setTopic, setCategories, setPage, setHasMore} = useCategory();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const handleFollowClick = async (category) => {
        try {
            await axiosPrivate.post(SUBSCRIBE_TOPIC_URL, {
                userId: auth.id,
                categoryId: category.categoryId,
            });
            setCategories([]);
            setHasMore(true);
            setPage(0);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <ExploreTopicTab setTopic={setTopic} />
            <Stack spacing={2} justifyContent={'center'} alignItems={'center'} mt={10}>
                <Typography variant='h3'>
                    {topic?.title}
                </Typography>
                <Typography variant='body1'>
                    Topic . 1M Stories . {topic?.subscribers?.length} Followers
                </Typography>
                <Button
                    sx={{
                        borderRadius: '50px',
                        border: '1px solid black',
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            borderColor: 'black',
                            color: 'black',
                        },
                        boxShadow: 'none',
                    }}
                    variant='contained'
                    onClick={()=> handleFollowClick(topic)}
                >
                    {
                        topic?.subscribers?.includes(auth.id) ? "Following" : "Follow"
                    }
                </Button>
            </Stack>
            <RecommendedBlogs topic={topic}/>
        </>
    );
};

export default TopicPage;
