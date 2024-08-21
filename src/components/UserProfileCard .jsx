/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Avatar, Card, CardContent, Typography, Paper, Badge, styled } from '@mui/material';
import CustomButton from './CustomButton'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));
const UserProfileCard = ({ user, children }) => {
    console.log(user);
    
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box
            sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
            elevation={0}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Badge
                sx={{ cursor: 'pointer' }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                }
            >
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </Badge>
            {children}

            {/* Hover Card */}
            {isHovered && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        zIndex: 10,
                        width: 300,  // adjust the width as needed
                    }}
                    elevation={0}
                >
                    <Paper elevation={4} sx={{ padding: 2 }}>
                        <Card sx={{ display: 'flex', alignItems: 'center' }} elevation={0}>
                            <Badge
                                sx={{ cursor: 'pointer' }}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                }
                            >
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {user?.followers || 0} Followers
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {user?.about}
                                </Typography>
                                <CustomButton text={'follow'}/>
                            </CardContent>
                        </Card>
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default UserProfileCard;
