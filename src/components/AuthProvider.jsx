import { createContext, useEffect, useState } from 'react'
import { lookInLocalStorage } from '../commons/session';

export const UserContext = createContext({});

const AuthProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState(JSON.parse(lookInLocalStorage("user")));
    useEffect(() => {
        const checkAuthStatus = () => {
            const userInStorage = lookInLocalStorage("user");
            setUserAuth(userInStorage != null ? JSON.parse(userInStorage) : { accessToken: null });
        }
        checkAuthStatus();        
    }, []);
    return (
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
           {children} 
        </UserContext.Provider>
    )
}
export default AuthProvider;
