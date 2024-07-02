import { useContext } from 'react'
import { UserContext } from '../components/AuthProvider'

const useAuth = () => useContext(UserContext);

export default useAuth;