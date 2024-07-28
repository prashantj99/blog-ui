import { useEffect, useState } from 'react';
import axios from '../api/axios';
import LoaderWithLabel from '../pages/loading.page';
import InternalServerError from '../pages/500.page';
import BlogCategoryContext from '../context/BlogCategoryContext';
import { ALL_CATEGORY_URL } from '../commons/AppConstant';


const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(ALL_CATEGORY_URL);
                setCategories(response.data);
            } catch (err) {
              setError('server');
            }finally{   
                setLoading(false);
            }
        };

        !categories ? fetchCategories() : setLoading(false);
  }, [categories]); 

  if (loading) {
    return <LoaderWithLabel />; 
  }

  if (error === 'server') {
    return <InternalServerError />; 
  }
  
  return (
    <BlogCategoryContext.Provider value={{categories, setCategories}}>
        {children}
    </BlogCategoryContext.Provider>
  )
}

export default CategoryProvider;
