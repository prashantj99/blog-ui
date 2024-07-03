import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home.page";
import Signup from "./pages/signup.page";
import Login from "./pages/login.page";
import EditorPage from "./pages/editor.page";
import ShowBlog from "./pages/viewblog.page";
import PrivateRouteWrapper from "./components/PrivateRouteWrapper";
import ResetPasswordPage from "./pages/reset-password.page";
import ChangePasswordPage from "./pages/change-password.page"
import NotFoundPage from "./pages/404.page";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import BlogCategoryContext from './context/BlogCategoryContext.js';
import InternalServerError from "./pages/500.page.jsx";
import LoadingPage from "./pages/loading.page.jsx";

function App() {
  const { userAuth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/category/all`);
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    // Fetch categories if categories array is empty
    if (categories.length === 0) fetchCategories();
  }, [categories]); // No dependencies to prevent infinite loop

  if (loading) {
    return <LoadingPage />; // Render loading state
  }

  if (error) {
    return <InternalServerError />; // Redirect to 500 error page if there's an error
  }
 
  return (
    <BrowserRouter>
      <BlogCategoryContext.Provider value={{categories, setCategories}}>
        <Routes>
          <Route exact path="/" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Login />} />
          <Route path="/login" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Login />} />
          <Route path="/signup" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Signup />} />
          <Route path="/reset_password" element={<ResetPasswordPage />} />
          <Route path="/change_password" element={<ChangePasswordPage />} />
          <Route path="/user" element={<PrivateRouteWrapper/>}>
            <Route path="feed" element={<Home />} />
            <Route path="editor" element={<EditorPage />} />
            <Route path="read" element={<ShowBlog />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BlogCategoryContext.Provider>
    </BrowserRouter>
  );
}

export default App;
