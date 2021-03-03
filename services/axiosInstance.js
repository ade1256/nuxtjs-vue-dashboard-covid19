import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `https://covid-19-data.p.rapidapi.com`,
  proxyHeaders: false,
  credentials: false,
  withCredentials: false
});

axiosInstance.interceptors.request.use((config) => {

  config.headers = Object.assign(
    {
      "x-rapidapi-key": "19aadcd09fmshef68efed7147fb4p19fa3ajsnaa40ec812fd0",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "useQueryString": true
    },
    config.headers
  );
  return config;
});