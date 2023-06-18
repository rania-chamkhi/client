import React, { useEffect, useState } from "react";
import { json, useNavigate, Link, useParams } from "react-router-dom";
import contactService from "../service/contactService";
import Swal from "sweetalert2";

const Contact = () => {
  const user = JSON.parse(localStorage.getItem("user")) ? true : false;
  const [vehicule, setVehicule] = useState();
  const [reservation, setReservation] = useState();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "information",
    subject: "",
    message: "",
  });
  const navigate = useNavigate();

  const { id, type } = useParams(); // get the reservation ID from the URL

  const handleInputChange = (e) => {
    if (e.target.name == "feedback") {
      const selectedOption = reservation.find(
        (option) => option.name === e.target.value
      );
      const selectedOptionId = selectedOption?._id ?? "";
    }
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = contactData;
    data["reservationId"] = id;

    contactService
      .ContactAction(contactData)
      .then((res) => {
        Swal.fire({
          title: "Votre message est envoyé avec succés",
          showDenyButton: false,
          confirmButtonText: "Exit",
        });
        // .then((e) => navigate(-1));
      })
      .catch((err) => {
        Swal.fire("un erreur est servenue", "", "info");
      });
  };
  const ContactFormType = () => {
    switch (contactData?.type) {
      case "feedBack":
        return (
          <div className="col-12 form-group">
            <select
              className="custom-select"
              style={{ height: 50 }}
              name={"type"}
              onChange={handleInputChange}
            >
              {reservation?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option._id}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      case "reclamation":
      default:
        return null;
    }
  };
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">
          Contact Us
        </h1>
        <div className="row">
          <div className="col-lg-7 mb-2">
            <div className="contact-form bg-light mb-4" style={{ padding: 30 }}>
              <form method="post" onSubmit={onSubmitHandler}>
                <div className="row">
                  <div className="col-6 form-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      placeholder="Your Name"
                      required
                      onChange={handleInputChange}
                      value={contactData.name}
                      name={"name"}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <input
                      type="email"
                      className="form-control p-4"
                      placeholder="Your Email"
                      required
                      //defaultValue={"rrr"}
                      // value={contactData.email}
                      name={"email"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <input
                      type="number"
                      className="form-control p-4"
                      placeholder="Numero de telephone"
                      required
                      value={contactData.phone}
                      name={"phone"}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <select
                      className="custom-select"
                      style={{ height: 50 }}
                      value={contactData.type}
                      defaultValue={contactData.type}
                      name={"type"}
                      onChange={handleInputChange}
                    >
                      <option selected value={"information"}>
                        Information
                      </option>
                      <option disabled={!user} value={"reclamation"}>
                        Reclamation
                      </option>
                      <option disabled={!user} value={"feedback"}>
                        FeedBack
                      </option>
                    </select>
                  </div>
                  {ContactFormType()}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control p-4"
                    placeholder="Subject"
                    value={contactData.subject}
                    name={"subject"}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control py-3 px-4"
                    rows={5}
                    placeholder="Message"
                    required
                    defaultValue={""}
                    onChange={handleInputChange}
                    name={"message"}
                    value={contactData.message}
                  />
                </div>
                <div>
                  <button
                    disabled={
                      contactData.name == "" ||
                      contactData.email == "" ||
                      contactData.phone == "" ||
                      contactData.subject == "" ||
                      contactData.message == ""
                    }
                    className="btn btn-primary py-3 px-5"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 mb-2">
            <div
              className="bg-secondary d-flex flex-column justify-content-center px-5 mb-4"
              style={{ height: 435 }}
            >
              <div className="d-flex mb-3">
                <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                <div className="mt-n1">
                  <h5 className="text-light">Head Office</h5>
                  <p>123 Street, New York, USA</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                <div className="mt-n1">
                  <h5 className="text-light">Branch Office</h5>
                  <p>123 Street, New York, USA</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                <div className="mt-n1">
                  <h5 className="text-light">Customer Service</h5>
                  <p>customer@example.com</p>
                </div>
              </div>
              <div className="d-flex">
                <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                <div className="mt-n1">
                  <h5 className="text-light">Return &amp; Refund</h5>
                  <p className="m-0">refund@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
