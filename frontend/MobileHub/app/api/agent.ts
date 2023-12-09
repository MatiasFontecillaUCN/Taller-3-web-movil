import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:5108/api";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config: any) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
  auth: (id: string, password: string) =>
    requests.post("/Auth/login", { id, password }),
};

const User = {
  register: (id: string, email: string, fullname: string, birthYear: number) =>
    requests.post("User", {id,email,fullname,birthYear}),
};

const Repositories = {
    getAll: () => requests.get("/Repositories")
}

export default {
  Auth,
  User,
  Repositories,
};
