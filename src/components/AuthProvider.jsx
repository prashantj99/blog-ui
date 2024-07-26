import { createContext, useState } from 'react'
import PropTypes from 'prop-types';

export const UserContext = createContext({});

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({accessToken: null});
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("isAuthenticated")) || false);
    return (
        <UserContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated }}>
           {children} 
        </UserContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default AuthProvider;
