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

function App() {
  let { userAuth } = useAuth();
  console.log(userAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Login />} />
        <Route path="/login" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Login />} />
        <Route path="/signup" element={userAuth && userAuth.accessToken ? <Navigate to="/user/feed" /> : <Signup />} />
        <Route path="/reset_password" element={<ResetPasswordPage />} />
        <Route path="/auth" element={<PrivateRouteWrapper isAuthenticated={userAuth && userAuth.forgotPasswordToken} />}>
          <Route path="change_password" element={<ChangePasswordPage />} />
        </Route>
        <Route path="/user" element={<PrivateRouteWrapper isAuthenticated={userAuth && userAuth.accessToken} />}>
          <Route path="feed" element={<Home />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="read" element={<ShowBlog />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
