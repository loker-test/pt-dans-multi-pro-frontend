import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/local-storage.hook.js";
import {useEffect} from "react";

export const AuthMiddleware = ({redirectPath = '/auth/login', children}) => {
  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')

  const navigate = useNavigate()

  useEffect(() => {
    if (user && token) {
      if (user === 'undefined' || token === 'undefined') {
        navigate(redirectPath, {replace: true})
      }
    }
  }, [])

  return children
}
