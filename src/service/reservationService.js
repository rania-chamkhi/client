import http from "./axiosContext";

const createReser = (data) => {
  return http.post("/reservation", data);
};
const getAll = () => {
  return http.get("/reservation");
};
const updaterservation = (id, data) => {
  return http.put(`/reservation/${id}`, data);
};
const getReservation = (id) => {
  return http.get(`/reservation/${id}`);
};
const getBynumPermis = (numPermis) => {
  return http.get(`/reservation/numPermis?numPermis=${numPermis}`);
};
const getAlldateReserv = () => {
  return http.get("/reservation/dateReserv");
};
const getAlldateFinLoc = () => {
  return http.get("/reservation/dateFinloc");
};
const deleteReserv = (id) => {
  return http.delete(`/reservation/${id}`);
};
const createNot=() => { 
  return http.post("/notification",{} )
}

const updateReservAss = (id, data) => {
  return http.put(`/reservation/ass/${id}`, data);
};
const getReservationByUserID = (id) => {
  return http.get(`/reservation/user/${id}`);
};
const getFeedBackByCar = (id) => {
    return http.get(`/contact/feedback/${id}`);
  };
export default {
  createReser,
  getFeedBackByCar,
  getReservationByUserID,
  getAll,
  updaterservation,
  getReservation,
  getBynumPermis,
  getAlldateReserv,
  getAlldateFinLoc,
  deleteReserv,
  updateReservAss,
  createNot
};
