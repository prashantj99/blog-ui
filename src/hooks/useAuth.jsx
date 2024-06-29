import { useContext } from 'react'
import { UserContext } from '../components/AuthProvider'

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;