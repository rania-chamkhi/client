import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Outlet } from "react-router-dom"
const Home=()=> {

    return(
        
        <div>
 <div>
  {/* Topbar Start */}
  <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
    <div className="row">
      <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
        <div className="d-inline-flex align-items-center">
          <a className="text-body pr-3" href><i className="fa fa-phone-alt mr-2" />+21650392386</a>
          <span className="text-body">|</span>
          <a className="text-body px-3" href><i className="fa fa-envelope mr-2" />location.voiture@gmail.com</a>
        </div>
      </div>
      <div className="col-md-6 text-center text-lg-right">
        <div className="d-inline-flex align-items-center">
          <a  className="text-body px-3" href >
            <i className="fab fa-facebook-f" />
          </a>
          <a className="text-body px-3" href>
            <i className="fab fa-twitter" />
          </a>
          <a className="text-body px-3" href>
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="text-body px-3" href>
            <i className="fab fa-instagram" />
          </a>
          <a className="text-body pl-3" href>
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Topbar End */}
  {/* Navbar Start */}
<Header/>
  {/* Navbar End */}
  {/* Search Start */}
<Outlet/>  
  {/* Vendor End */}
  {/* Footer Start */}
  <Footer/>
  {/* Footer End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa fa-angle-double-up" /></a>
</div>

        </div>
    )
}
export default Home