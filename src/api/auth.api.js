import {request} from "./request.js";

export const authSignIn = async (username, password) => {
  return await request.post('/auth/login', {username: username, password: password})
}
