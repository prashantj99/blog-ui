import useAuth from './useAuth';
import api from '../api/axios';

const useRefreshToken = () => {
    const { userAuth, setUserAuth } = useAuth();
    const formData = new FormData();
    formData.append('refreshToken', userAuth.refreshToken);
    const refresh = async () => {
        try {
            const response = await api.post('/auth/refresh_token', formData);
            setUserAuth((prev) => {
                console.log('Previous auth:', prev);
                console.log('New tokens:', response.data);
                return { ...prev, accessToken: response.data.accessToken };
            });
            console.log(response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
            localStorage.clear();
            sessionStorage.clear();
            setUserAuth({});
            return null;
        }
    }
    return refresh;
}

export default useRefreshToken;