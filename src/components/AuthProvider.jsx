import { createContext, useEffect, useState } from 'react'
import { lookInLocalStorage } from '../commons/session';
import axios from '../api/axios';

export const UserContext = createContext({});

const AuthProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState({accessToken: null});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async() => {
            const userInStorage = lookInLocalStorage("user");
            if(userInStorage == null){
                return ;
            }
            const user = JSON.parse(userInStorage);
            if(user){
                try{
                    const response = await axios.get("/auth/validateToken", {
                        params: { token: user.accessToken },
                    });
                    if(response.status === 200){
                        setUserAuth(user);
                        setIsAuthenticated(true);
                    }
                }catch(err){
                    console.log(err);
                    setUserAuth({accessToken:null}); 
                    localStorage.clear();
                    sessionStorage.clear();
                }
            }
        }
        if(!isAuthenticated) checkAuthStatus();        
    }, [isAuthenticated]);
    return (
        <UserContext.Provider value={{ userAuth, setUserAuth, isAuthenticated, setIsAuthenticated }}>
           {children} 
        </UserContext.Provider>
    )
}
export default AuthProvider;
