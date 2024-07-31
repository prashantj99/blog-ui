import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { BASE_URL } from '../commons/AppConstant';

const ArticleCard = ({ category, title, imageUrl, description }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, width:'100%', justifyContent:'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{textTransform: 'capitalize'}}>
            {title}
          </Typography>
          <Typography variant="body1" component="div" sx={{textTransform: 'capitalize'}}>
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{textTransform: 'capitalize'}}>
            {category}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150, }}
        image={`${BASE_URL}/file/name/${imageUrl}`}
        alt={title}
      />
    </Card>
  );
};

ArticleCard.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ArticleCard;
