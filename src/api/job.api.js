import {request} from "./request.js";

export const getJobList = async (params) => {
  return request
    .get('/job', {
      params: params
    })
}

export const getJobDetail = async (id) => {
  return request
    .get(`/job/${id}`)
}
