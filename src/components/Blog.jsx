import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import { Bookmark, Favorite, FavoriteBorder} from '@mui/icons-material'
import PropTypes from 'prop-types';
import { BASE_URL } from '../commons/AppConstant'
import formatRelativeTime from '../utils/date_formatter'

const Blog = ({blog}) => {
    
    const {title, description, bannerUrl, lastUpdated, userDT:{name}} = blog;

    return (
        <Card sx={{margin:5}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                        {name[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name.charAt(0).toUpperCase()+name.slice(1)}
                subheader={formatRelativeTime(lastUpdated)}
            />
            <CardMedia
                component="img"
                height={400}
                image={`${BASE_URL}/file/name/${bannerUrl}`}
                alt="blog_banner"
            />
            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites">
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red'}} />} />
                </IconButton>
                <IconButton aria-label="save for later">
                    <Checkbox icon={<Bookmark />} checkedIcon={<Bookmark sx={{ color: 'skyblue' }} />} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="read more">
                    <ReadMoreIcon color='green'/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Blog;
