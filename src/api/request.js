import axios from "axios";
import {environment} from "../environment.js";

export const tokenMiddleware = (config) => {
  const accessToken = localStorage.getItem('token')

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
}


export const request = axios.create({
  baseURL: environment.API_URL
})

request.interceptors.request.use(tokenMiddleware)
