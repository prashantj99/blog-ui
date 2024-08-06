import { Box } from '@mui/material'
import TopicsList from './TopicList'
import RecommendedTopics from './RecomendedList'
import ProfileSuggestions from './ProfileSuggestions'

export default function Rightbar() {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: 'none', sm: 'block', fontWeight:200} }}>
        <TopicsList/>
        <RecommendedTopics/>
        <ProfileSuggestions/>
    </Box>
  )
}
