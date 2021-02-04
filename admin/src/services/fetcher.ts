import axios from "axios";
import { ADMIN_TOKEN_KEY, TEST_TOKEN } from "utils/constants";

const baseURL = process.env.REACT_APP_API_URL;

const token = "Bearer " + localStorage.getItem(ADMIN_TOKEN_KEY) ?? null;
const fetcher = (method, url, body?) =>
  fetch(baseURL + url, {
    method: method,
    headers: {
      Authorization: token,
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
