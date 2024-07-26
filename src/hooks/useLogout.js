import useAuth from './useAuth'

const useLogout = () => {
    const {setAuth} = useAuth();
    const logout = ()=>{
        setAuth({accessToken: null});
        localStorage.clear(); 
    }
    return logout;
}

export default useLogout
