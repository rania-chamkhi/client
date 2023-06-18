import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation, NavLink } from "react-router-dom";

const Header = ({ hideSlider = false }) => {

  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage?.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    user && setUserName(user?.user?.username ?? null);
  }, []);
  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      {/* Navbar Start */}
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <a href className="navbar-brand" >
              <h1 className="text-uppercase text-primary mb-1"  >AlloLocation Car</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
              <NavLink
            to="/"
            exact
            className={`nav-link ${activeLink === "/" ? "active" : ""}`}
            onClick={() => handleLinkClick("/")}
          >
            Accueil
          </NavLink>
                <a href="#about" className={`nav-item nav-link ${activeLink === "about" ? "active" : ""}`}
                  onClick={() => handleLinkClick("about")}>
                  À propos de nous
                </a>
                <a href="#services" className={`nav-item nav-link ${activeLink === "services" ? "active" : ""}`}
                  onClick={() => handleLinkClick("services")}>
                  Services
                </a>
                <a href="#cars" className={`nav-item nav-link ${activeLink === "cars" ? "active" : ""}`}
                  onClick={() => handleLinkClick("cars")}>
                  Vehicules
                </a>


                <a href="#contact" className={`nav-item nav-link ${activeLink === "contact" ? "active" : ""}`}
                  onClick={() => handleLinkClick("contact")}>
                  Contact
                </a>

                <li class="nav-item ">
                  {userName ? (
                    <>
                      {" "}
                      <div className="nav-item dropdown">
                        <NavLink
                          to="/profil"
                          className={`nav-item nav-link ${activeLink === "/profil" ? "active" : ""}`}
                          onClick={() => handleLinkClick("/profil")}
                          data-toggle="dropdown"
                        >
                          <i className="fa fa-user text-yellow"></i> <b>{userName}</b>
                        </NavLink>
                        <div className="dropdown-menu rounded-0 m-0">
                          <a className="dropdown-item" href="/profil" >
                            <i class="fa fa-user text-yellow"></i>{" "}
                            <b>{userName}</b>
                          </a>
                          <a className="dropdown-item" onClick={Logout}>
                            <i class="fas fa-sign-out-alt"></i>
                            <b>Deconnexion</b>
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a href="/Login" className={`nav-item nav-link ${activeLink === "/Login" ? "active" : ""}`}>
                      <i class="fa fa-user text-yellow"></i>{" "}
                      <b>{"Connexion"}</b>
                    </a>
                  )}{" "}
                </li>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {!hideSlider && (
        <>
          <div
            style={{ textAlign: "center !important" }}
            className="container-fluid bg-white pt-3 px-lg-5"
          >
           
          </div>

          <div className="container-fluid p-0" style={{ marginBottom: 90 }}>
            <div
              id="header-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 900 }}>
                      <h4 className="text-white text-uppercase mb-md-3">
                        Rent A Car
                      </h4>
                      <h1 className="display-1 text-white mb-md-4">
                        Best Rental Cars In Your Location
                      </h1>
                      <a href className="btn btn-primary py-md-3 px-md-5 mt-2">
                        Reserve Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: 900 }}>
                      <h4 className="text-white text-uppercase mb-md-3">
                        Rent A Car
                      </h4>
                      <h1 className="display-1 text-white mb-md-4">
                        Quality Cars with Unlimited Miles
                      </h1>
                      <a href className="btn btn-primary py-md-3 px-md-5 mt-2">
                        Reserve Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#header-carousel"
                data-slide="prev"
              >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                  <span className="carousel-control-prev-icon mb-n2" />
                </div>
              </a>
              <a
                className="carousel-control-next"
                href="#header-carousel"
                data-slide="next"
              >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                  <span className="carousel-control-next-icon mb-n2" />
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Header;
