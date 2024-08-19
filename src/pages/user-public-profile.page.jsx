import { Avatar, Box, Stack, Typography, Tabs, Tab, ListItem, ListItemText, List } from "@mui/material";
import CustomButton from '../components/CustomButton';
import { NotificationAdd } from "@mui/icons-material";
import { useEffect, useState } from "react";
import PublishedBlogList from "../components/PublishedBlogList";
import FollowersList from "../components/FollwersList";
import useUserProfile from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import NotFoundPage from '../pages/404.page'


const UserPublicProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { userId } = useParams();
    const fetchUser = useUserProfile();
    const [user, setUser] = useState({});

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        if (!userId) return;
        const getUser = async () => {
            try {
                const user = await fetchUser(userId);
                console.log(user);
                if (user == null) {
                    return <NotFoundPage />;
                }
                setUser(user);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [])


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', p: 10}}>
                <Box sx={{ maxWidth: '250px' }}>
                    <Stack spacing={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                            <Typography variant="h5">{user?.name}</Typography>
                        </Box>
                        <Typography variant="body1">
                            {user?.about}
                        </Typography>
                        <Typography variant="body1">
                            1.2M Followers
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <List>
                            {
                                user && user?.accounts?.map((account) => {
                                    return (
                                        <ListItem component="a" href={account.link} target="_blank" rel="noopener noreferrer" key={account.accountId}>
                                            <ListItemText primary={`@${account.platform}`} />
                                        </ListItem>
                                    )
                                })
                            }

                        </List>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                            <CustomButton clickHandler={() => { }} text={'follow'} width={'200px'} border={5} />
                            <CustomButton clickHandler={() => { }} text={<NotificationAdd />} width={'200px'} border={5} />
                        </Box>
                    </Stack>
                </Box>
                <Box sx={{ flex: 1, pl: 10 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="profile tabs">
                        <Tab label="Published" selectedTab/>
                        <Tab label="Following" />
                    </Tabs>
                    <Box sx={{ pt: 3}}>
                        {selectedTab === 0 && <PublishedBlogList />}
                        {selectedTab === 1 && <FollowersList />}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UserPublicProfilePage;
