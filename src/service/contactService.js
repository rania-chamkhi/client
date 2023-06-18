import http from "./axiosContext";

export const ContactAction = async (data) => {
  try {
    const response = await http.post("contact", data);

    console.log(response.data); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
  }
};
const getFeedBackByCar = (id) => {
  return http.get(`/contact/feedback/${id}`);
};

export default {
  ContactAction,
  getFeedBackByCar,
};
