import http from "./axiosContext";

const register = (data) => {
  return http.post("/auth/signup", data);
};

const LoginAuth = (data) => {
  return http.post("/auth/signin", data);
};

const LogoutUser = (data) => {
  return http.post("/auth/signin", data);
};

const getUser = (id) => {
  return http.get(`/user/${id}`);
};

const getAll = () => {
  return http.get("/user");
};



const deleteUser = (id) => {
  return http.delete(`/user/${id}`);
};
const updateProfil = (id, data) => {
  return http.put(`/user/${id}`, data);
};

export default {
  register,
  LoginAuth,
  updateProfil,
  getUser,
  getAll,
  deleteUser,
  LogoutUser,
};
