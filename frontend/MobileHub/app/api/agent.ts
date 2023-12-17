import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

axios.defaults.baseURL = "http://192.168.0.30:5017";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async (config: any) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
  auth: (id: string, password: string) =>
    requests.post("/Auth", { id, password }),
};

const User = {
  register: (id: string, email: string, fullname: string, birthYear: number) =>
    requests.post("/User", { id, email, fullname, birthYear }),
  updateUser: (
    id: string,
    email: string,
    fullname: string,
    birthYear: number
  ) => requests.patch("/User/" + id, { email, fullname, birthYear }),
  getAll: () => requests.get("/User"),
  getUser: (id: string) => requests.get("/User/" + id),
  updatePassword: (id: string, newPassword: string, password: string) =>
    requests.patch("/User/update-password/" + id, { newPassword, password }),
};

const Repositories = {
  getAll: () => requests.get("/Repositories"),
  getCommits: (repoName: string) => requests.get("/Repositories/" + repoName),
};

export default {
  Auth,
  User,
  Repositories,
};
