import {axiosInstance} from './axiosInstance'

export const GET_GLOBAL_CASES = () => {
  const url = `/totals`
  const data = axiosInstance.get(url)
  return data
}

export const GET_COUNTRY_CASES = (name) => {
  const url = `/country?name=${name}`
  const data = axiosInstance.get(url)
  return data
}