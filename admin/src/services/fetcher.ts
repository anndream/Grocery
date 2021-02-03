import axios from "axios";
import { TEST_TOKEN } from "utils/constants";

const baseURL = process.env.REACT_APP_API_URL;

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// instance.interceptors.request.use(function (config) {
//   const token = TEST_TOKEN;
//   config.headers.Authorization = token;

//   return config;
// });

// export const fetcher = instance;

const fetcher = (method, url, body?) =>
  fetch(baseURL + url, {
    method: method,
    headers: {
      Authorization: TEST_TOKEN,
      Accept: "application/json",
    },
    body: body ? new URLSearchParams(body) : null,
  });

const post = (url, body) => fetcher("POST", url, body);
const put = (url, body) => fetcher("PUT", url, body);
const del = url => fetcher("DELETE", url);
const get = url => fetcher("GET", url);

export default {
  post,
  put,
  delete: del,
  get,
};
