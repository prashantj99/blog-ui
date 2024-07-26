import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.page";
import Signup from "./pages/signup.page";
import Login from "./pages/login.page";
import EditorPage from "./pages/editor.page";
import ShowBlog from "./pages/viewblog.page";
import PrivateRouteWrapper from "./components/PrivateRouteWrapper";
import ResetPasswordPage from "./pages/reset-password.page";
import ChangePasswordPage from "./pages/change-password.page"
import NotFoundPage from "./pages/404.page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {REACT_APP_GOOGLE_CLIENT_ID} from './commons/AppConstant.jsx';
import Layout from "./components/Layout.jsx";
import Unauthorized from './pages/Unauthorized.page.jsx'
import {ROLES} from './commons/AppConstant.jsx'
import PersistentLogin from './components/PersistentLogin.jsx'
import CategoryProvider from './components/CategoryProvider.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <CategoryProvider>
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              
              {/* public routes */}
              <Route exact path="/" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgotpassword" element={<ResetPasswordPage/>} />
              <Route path="changepassword" element={<ChangePasswordPage/>} />
              <Route path="unathorized" element={<Unauthorized/>}/>
              
              {/* private routes */}
              <Route element={<PersistentLogin/>}>
                <Route element={<PrivateRouteWrapper allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
                  <Route path="feed" element={<Home/>} />
                  <Route path="read" element={<ShowBlog />} />
                </Route>
              </Route>  

            </Route>
            
            {/* private routes */}
            <Route element={<PersistentLogin/>}>
                <Route element={<PrivateRouteWrapper allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
                  <Route path="/editor" element={<EditorPage />}/>
                </Route>
            </Route>
            
            {/* catch all */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>      
        </GoogleOAuthProvider>
      </CategoryProvider>   
    </BrowserRouter>
  );
}

export default App;
