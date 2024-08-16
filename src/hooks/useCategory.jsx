import { useState, useEffect } from 'react';
import { BASE_URL } from '../commons/AppConstant';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const useCategory = () => {
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState([]);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosPrivate.get(`${BASE_URL}/category/page`, {
                    params: {
                        pageNumber: page,
                        pageSize: 10,
                    },
                });

                setCategories(prevCategories => [
                    ...prevCategories,
                    ...response.data.categories.filter(
                        category => !prevCategories.some(prev => prev.categoryId === category.categoryId)
                    )
                ]);
                if(!topic){
                    setTopic(response.data.categories.at(0));
                }
                setHasMore(!response.data.isLastPage); 
            } catch (error) {
                if (error?.response && error?.response?.status === 404) {
                    setHasMore(false); 
                }
                console.error('Failed to fetch categories', error);
            } finally {
                setLoading(false);
            }
        };

        if(!loading && hasMore) {
            fetchCategories();
        }
    }, [axiosPrivate, hasMore, loading, page, topic, categories]);

    return { categories, loading, hasMore, setPage, topic, setTopic, setCategories, setHasMore};
};

export default useCategory;
