import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import React from 'react'
import Blog from './Blog'


export default function Feed() {
    return (
        <Box flex={4} p={2}>
            <Blog/>
            <Blog/>
            <Blog/>
            <Blog/>
            <Blog/>
            <Blog/>
        </Box>
    )
}
