import {useQuery} from "react-query";
import {getJobDetail, getJobList} from "../api/job.api.js";

export const useJobList = (payload) => {
  return useQuery(
    ['joblist', payload],
    async () => await getJobList(payload)
  )
}

export const useJobDetail = (payload) => {
  return useQuery(
    ['jobdetail', payload],
    async () => await getJobDetail(payload)
  )
}
