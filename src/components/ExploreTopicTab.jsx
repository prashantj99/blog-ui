/* eslint-disable react/prop-types */
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Button, Chip, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import useCategory from '../hooks/useCategory';

const ExploreTopicTab = ({setTopic}) => {
    const { categories, loading, hasMore, setPage } = useCategory();
    const [scrollableElement, setScrollableElement] = useState(null);

    // Load more categories when scrolling near the end
    const handleScroll = useCallback(() => {
        if (scrollableElement) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollableElement;

            // If near the end of the scrollable element, load more categories
            if (scrollLeft + clientWidth >= scrollWidth - 100 && hasMore && !loading) {
                console.log("srcolling");
                setPage(prevPage => prevPage + 1);
            }
        }
    }, [scrollableElement, hasMore, loading, setPage]);

    useEffect(() => {
        const element = document.querySelector('.scrollable-tabs');
        if (element) {
            setScrollableElement(element);
            element.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const handleScrollLeft = () => {
        if (scrollableElement) {
            scrollableElement.scrollLeft -= 200;
        }
    };

    const handleScrollRight = () => {
        if (scrollableElement) {
            scrollableElement.scrollLeft += 200;
        }
    };

    useEffect(() => {
        setTopic(categories?.at(0));
    }, [categories, setTopic])
    return (
        <>
            <Stack spacing={0} direction={'row'}>
                <Button onClick={handleScrollLeft} startIcon={<ArrowBackIos />}></Button>
                <div className="scrollable-tabs" style={{ overflowX: 'hidden', width: '100%', whiteSpace: 'nowrap', scrollBehavior: 'smooth', }}>
                    {
                        categories.map(category => {
                            return <Chip
                                key={category.categoryId}
                                label={category?.title}
                                sx={{ cursor: 'pointer', m: 2, p: 2 }}
                                onClick={() => { console.log(category); setTopic(category)}}
                            />
                        })
                    }
                </div>
                <Button onClick={handleScrollRight} endIcon={<ArrowForwardIos />}></Button>
            </Stack>
        </>
    );
};

export default ExploreTopicTab;
