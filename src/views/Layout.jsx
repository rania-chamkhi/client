import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vehiculeService from "../service/vehiculeService";
import reservationService from "../service/reservationService";
import Map from "../components/map";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("user")) ? true : false;
  const [vehicule, setVehicule] = useState();
  const [reservation, setReservation] = useState();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    contactSubject: "Information",
    subject: "",
    message: "",
  });
  const handleInputChange = (e) => {
    if (e.target.name == "FeedBack") {
      const selectedOption = reservation.find(
        (option) => option.name === e.target.value
      );
      const selectedOptionId = selectedOption?._id ?? "";
    }
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
    console.log("contact", contactData);
  };
  const getAll = () => {
    vehiculeService
      .getAll()
      .then((res) => {
        console.log(res);
        setVehicule(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    reservationService
      .getAll()
      .then((res) => {
        console.log("res", res.data.data);
        setReservation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAll();
  }, []);
  const ContactFormType = () => {
    switch (contactData?.contactSubject) {
      case "FeedBack":
        return (
          <div className="col-12 form-group">
            <select
              className="custom-select"
              style={{ height: 50 }}
              name={"contactSubject"}
              onChange={handleInputChange}
            >
              {reservation.map((option) => (
                <option key={option._id} value={option._id}>
                  {option._id}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      case "Reclamation":
      default:
        return null;
    }
  };
  return (
    <div>
      <div>
        {/* About Start */}
        <div className="container-fluid py-5">
          <div id="about" className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">01</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Welcome To <span className="text-primary">Royal Cars</span>
            </h1>
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center">
                <img className="w-75 mb-4" src="img/about.png" alt />
                <p>
                  Justo et eos et ut takimata sed sadipscing dolore lorem, et
                  elitr labore labore voluptua no rebum sed, stet voluptua amet
                  sed elitr ea dolor dolores no clita. Dolores diam magna clita
                  ea eos amet, amet rebum voluptua vero vero sed clita accusam
                  takimata. Nonumy labore ipsum sea voluptua sea eos sit justo,
                  no ipsum sanctus sanctus no et no ipsum amet, tempor labore
                  est labore no. Eos diam eirmod lorem ut eirmod, ipsum diam
                  sadipscing stet dolores elitr elitr eirmod dolore. Magna elitr
                  accusam takimata labore, et at erat eirmod consetetur tempor
                  eirmod invidunt est, ipsum nonumy at et.
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4 mb-2">
                <div
                  className="d-flex align-items-center bg-light p-4 mb-4"
                  style={{ height: 150 }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 }}
                  >
                    <i className="fa fa-2x fa-headset text-secondary" />
                  </div>
                  <h4 className="text-uppercase m-0">
                    24/7 Car Rental Support
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150 }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 }}
                  >
                    <i className="fa fa-2x fa-car text-secondary" />
                  </div>
                  <h4 className="text-light text-uppercase m-0">
                    Car Reservation Anytime
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div
                  className="d-flex align-items-center bg-light p-4 mb-4"
                  style={{ height: 150 }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 }}
                  >
                    <i className="fa fa-2x fa-map-marker-alt text-secondary" />
                  </div>
                  <h4 className="text-uppercase m-0">
                    Lots Of Pickup Locations
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Services Start */}
        <div id="services" className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">02</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Our Services
            </h1>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-taxi text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">01</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Car Rental</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-money-check-alt text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">02</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Car Financing</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-car text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">03</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Car Inspection</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-cogs text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">04</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Repairing</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-spray-can text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">05</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Painting</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-pump-soap text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">06</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Cleaning</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Services End */}
        {/* Banner Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="bg-banner py-5 px-4 text-center">
              <div className="py-5">
                <h1 className="display-1 text-uppercase text-primary mb-4">
                  50% OFF
                </h1>
                <h1 className="text-uppercase text-light mb-4">
                  Special Offer For New Members
                </h1>
                <p className="mb-4">
                  Only for Sunday from 1st Jan to 30th Jan 2045
                </p>
                <a className="btn btn-primary mt-2 py-3 px-5" href>
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}
        {/* Rent A Car Start */}
        <div id="cars" className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">03</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Find Your Car
            </h1>
            <div className="row">
              {vehicule?.map((item) => {
                return (
                  <div className="col-lg-4 col-md-6 mb-2">
                    <div className="rent-item mb-4">
                      <span>
                        <img
                          style={{ width: "100%", height: "200px" }}
                          src={
                            "http://localhost:3000/file/UploadVehicule/" +
                            item.file
                          }
                        />
                      </span>
<br></br><br></br>
                      <h4 className="text-uppercase mb-4">{item.marque}</h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i
                            class="fas fa-map-marker-alt	text-primary mr-1"
                            aria-hidden="true"
                          />
                          <span>2015</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>AUTO</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>25K</span>
                        </div>
                      </div>

                      <Link to={`/DetailsVehicule/${item._id}`}>
                        <button type="submit" class="btn btn-primary px-3">
                          Voir details
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rent A Car End */}
        {/* Team Start */}
        <div id="teams" className="container-fluid py-5">
          <div className="container py-5">
            <h1 className="display-1 text-primary text-center">04</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Meet Our Team
            </h1>
            <div
              className="owl-carousel team-carousel position-relative"
              style={{ padding: "0 30px" }}
            >
              <div className="team-item">
                <img className="img-fluid w-100" src="img/team-1.jpg" alt />
                <div className="position-relative py-4">
                  <h4 className="text-uppercase">Full Name</h4>
                  <p className="m-0">Designation</p>
                  <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <img className="img-fluid w-100" src="img/team-2.jpg" alt />
                <div className="position-relative py-4">
                  <h4 className="text-uppercase">Full Name</h4>
                  <p className="m-0">Designation</p>
                  <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <img className="img-fluid w-100" src="img/team-3.jpg" alt />
                <div className="position-relative py-4">
                  <h4 className="text-uppercase">Full Name</h4>
                  <p className="m-0">Designation</p>
                  <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-item">
                <img className="img-fluid w-100" src="img/team-4.jpg" alt />
                <div className="position-relative py-4">
                  <h4 className="text-uppercase">Full Name</h4>
                  <p className="m-0">Designation</p>
                  <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Team End */}
        {/* Banner Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="row mx-0">
              <div className="col-lg-6 px-0">
                <div
                  className="px-5 bg-secondary d-flex align-items-center justify-content-between"
                  style={{ height: 350 }}
                >
                  <img
                    className="img-fluid flex-shrink-0 ml-n5 w-50 mr-4"
                    src="img/banner-left.png"
                    alt
                  />
                  <div className="text-right">
                    <h3 className="text-uppercase text-light mb-3">
                      Want to be driver?
                    </h3>
                    <p className="mb-4">
                      Lorem justo sit sit ipsum eos lorem kasd, kasd labore
                    </p>
                    <a className="btn btn-primary py-2 px-4" href>
                      Start Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 px-0">
                <div
                  className="px-5 bg-dark d-flex align-items-center justify-content-between"
                  style={{ height: 350 }}
                >
                  <div className="text-left">
                    <h3 className="text-uppercase text-light mb-3">
                      Looking for a car?
                    </h3>
                    <p className="mb-4">
                      Lorem justo sit sit ipsum eos lorem kasd, kasd labore
                    </p>
                    <a className="btn btn-primary py-2 px-4" href>
                      Start Now
                    </a>
                  </div>
                  <img
                    className="img-fluid flex-shrink-0 mr-n5 w-50 ml-4"
                    src="img/banner-right.png"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}
        {/* Testimonial Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h1 className="display-1 text-primary text-center">05</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Our Client's Say
            </h1>
            <div className="owl-carousel testimonial-carousel">
              <div className="testimonial-item d-flex flex-column justify-content-center px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <img
                    className="img-fluid ml-n4"
                    src="img/testimonial-1.jpg"
                    alt
                  />
                  <h1 className="display-2 text-white m-0 fa fa-quote-right" />
                </div>
                <h4 className="text-uppercase mb-2">Client Name</h4>
                <i className="mb-2">Profession</i>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
              <div className="testimonial-item d-flex flex-column justify-content-center px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <img
                    className="img-fluid ml-n4"
                    src="img/testimonial-2.jpg"
                    alt
                  />
                  <h1 className="display-2 text-white m-0 fa fa-quote-right" />
                </div>
                <h4 className="text-uppercase mb-2">Client Name</h4>
                <i className="mb-2">Profession</i>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
              <div className="testimonial-item d-flex flex-column justify-content-center px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <img
                    className="img-fluid ml-n4"
                    src="img/testimonial-3.jpg"
                    alt
                  />
                  <h1 className="display-2 text-white m-0 fa fa-quote-right" />
                </div>
                <h4 className="text-uppercase mb-2">Client Name</h4>
                <i className="mb-2">Profession</i>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
              <div className="testimonial-item d-flex flex-column justify-content-center px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <img
                    className="img-fluid ml-n4"
                    src="img/testimonial-4.jpg"
                    alt
                  />
                  <h1 className="display-2 text-white m-0 fa fa-quote-right" />
                </div>
                <h4 className="text-uppercase mb-2">Client Name</h4>
                <i className="mb-2">Profession</i>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit sea sed
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonial End */}
        {/* Contact Start */}
        <div id="contact" className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">06</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Contact Us
            </h1>
            <div className="row">
              <div className="col-lg-7 mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form>
                    <div className="row">
                      <div className="col-6 form-group">
                        <input
                          type="text"
                          className="form-control p-4"
                          placeholder="Your Name"
                          required="required"
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
                          required="required"
                          value={contactData.email}
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
                          required="required"
                          value={contactData.phoneNumber}
                          name={"phoneNumber"}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <select
                          className="custom-select"
                          style={{ height: 50 }}
                          value={contactData.contactSubject}
                          defaultValue={contactData.contactSubject}
                          name={"contactSubject"}
                          onChange={handleInputChange}
                        >
                          <option selected value={"Information"}>
                            Information
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
                        required="required"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control py-3 px-4"
                        rows={5}
                        placeholder="Message"
                        required="required"
                        defaultValue={""}
                        onChange={handleInputChange}
                        name={"message"}
                        value={contactData.message}
                      />
                    </div>
                    <div>
                      <button
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
        {/* Contact End */}
        {/* Vendor Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="owl-carousel vendor-carousel">
              <div className="bg-light p-4">
                <img src="img/vendor-1.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-2.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-3.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-4.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-5.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-6.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-7.png" alt />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-8.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
