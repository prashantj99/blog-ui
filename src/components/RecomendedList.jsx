import React from 'react';
import { Box, Chip, Typography, Link } from '@mui/material';

const RecommendedTopics = () => {
  const topics = [
    'Data Science',
    'React',
    'Self Improvement',
    'Software Engineering',
    'Design',
    'Humor',
    'Artificial Intelligence'
  ];

  return (
    <Box sx={{ p: '16px', backgroundColor: '#f5f5f5', borderRadius: '10px', mb:10 }}>
      <Typography variant="h6" gutterBottom>
        Recommended topics
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {topics.map((topic) => (
          <Chip key={topic} label={topic} sx={{cursor:'pointer'}} component='a' href='#'/>
        ))}
      </Box>
      <Link href="#" sx={{ marginTop: '16px', display: 'block', textDecoration: 'none', color: 'primary.main' }}>
        See more topics
      </Link>
    </Box>
  );
};

export default RecommendedTopics;
