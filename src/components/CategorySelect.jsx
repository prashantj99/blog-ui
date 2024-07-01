import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import { EditorContext } from '../pages/editor.page';

const CategorySelect = () => {
    const { EditorState, setEditorState } = useContext(EditorContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController(); // Create an AbortController instance
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/category/all?pageNumber=${pageNumber}`);
                console.log(response.data.categoryDtos);
                setCategories(prevCategories => [...prevCategories, ...response.data.categoryDtos]);
                setHasMore(!response.data.last);
            } catch (error) {
                console.error('Error fetching categories', error);
                setError('Failed to fetch categories');
                toast.error('Network error!!!');
            } finally {
                setLoading(false);
            }
        };

        if (hasMore) {
            fetchCategories();
        }
        // Cleanup function to abort the request
        return () => {
            abortController.abort(); // Abort the request on component unmount
        };
    }, [pageNumber, hasMore]);

    const handleChange = (event) => {
        setEditorState({ ...EditorState, categoryId: event.target.value })
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            && !loading
            && hasMore
        ) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading && pageNumber === 1) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Box sx={{ minWidth: 120, mb: 2 }}>
                {toast.error('Network error!!!')}
                <FormControl fullWidth>
                    <InputLabel id="select-label">Select Category</InputLabel>
                    <Select labelId="select-label" id="select" value="" disabled>
                        <MenuItem value=""></MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    return (
        <Box sx={{ minWidth: 120, mb: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={EditorState?.categoryId || ''}
                    label="Category"
                    onChange={handleChange}
                >
                    {categories.map(({ categoryId, categoryDescription, categoryTitle }) => (
                        <MenuItem key={categoryId} value={categoryId}>
                            <ListItemText primary={categoryTitle} secondary={categoryDescription} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CategorySelect;
