import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material"

const UserPublicProfilePage = () => {
    return (
        <>
            <Box sx={{ display: 'flex', direction: 'row', p: 10 }}>
                <Box sx={{ maxWidth: '250px' }}>
                    <Stack spacing={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                            <Typography variant="h5">Prashant</Typography>
                        </Box>
                        <Typography variant="body1">
                            High-emphasis, distinguished by their use of elevation and fill.
                            They contain actions that are primary to your app.
                        </Typography>
                        <Typography variant="body1">
                            1.2M Followers
                        </Typography>
                        <Typography variant="body1">
                            @LinkedIn
                        </Typography>
                        <Typography variant="body1">
                            @medium
                        </Typography>
                        <Button variant="contained">follow</Button>
                    </Stack>
                </Box>
                <Box sx={{ pl: 10 }}>
                    <Typography variant="h3">
                        Topics
                    </Typography>
                    {
                        ['java', 'c++', 'python'].map((i, index) => {
                            return <Chip key={index} sx={{ fontSize: '18px' }}>{i}</Chip>
                        })
                    }
                </Box>
            </Box>
        </>
    )
}

export default UserPublicProfilePage
