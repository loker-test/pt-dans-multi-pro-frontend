import {useMutation} from "react-query";
import {authSignIn} from "../api/auth.api.js";

export const useAuthLoginMutation = () => {
  return useMutation(
    ({username, password}) => authSignIn(username, password)
  )
}
