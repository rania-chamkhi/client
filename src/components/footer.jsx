import React from "react"

const Footer =()=> {

    return(
        <div>

{/* Footer Start */}
<div className="container-fluid bg-secondary py-5 px-sm-3 px-md-5" style={{marginTop: 90}}>
    <div className="row pt-5">
      <div className="col-lg-3 col-md-6 mb-5">
        <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
        <p className="mb-2"><i className="fa fa-map-marker-alt text-white mr-3" />123 Street, New York, USA</p>
        <p className="mb-2"><i className="fa fa-phone-alt text-white mr-3" />+012 345 67890</p>
        <p><i className="fa fa-envelope text-white mr-3" />info@example.com</p>
        <h6 className="text-uppercase text-white py-2">Follow Us</h6>
        <div className="d-flex justify-content-start">
          <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i className="fab fa-twitter" /></a>
          <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i className="fab fa-facebook-f" /></a>
          <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#"><i className="fab fa-linkedin-in" /></a>
          <a className="btn btn-lg btn-dark btn-lg-square" href="#"><i className="fab fa-instagram" /></a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-5">
        <h4 className="text-uppercase text-light mb-4">Usefull Links</h4>
        <div className="d-flex flex-column justify-content-start">
          <a className="text-body mb-2" href="#"><i className="fa fa-angle-right text-white mr-2" />Private Policy</a>
          <a className="text-body mb-2" href="#"><i className="fa fa-angle-right text-white mr-2" />Term &amp; Conditions</a>
          <a className="text-body mb-2" href="#"><i className="fa fa-angle-right text-white mr-2" />New Member Registration</a>
          <a className="text-body mb-2" href="#"><i className="fa fa-angle-right text-white mr-2" />Affiliate Programme</a>
          <a className="text-body mb-2" href="#"><i className="fa fa-angle-right text-white mr-2" />Return &amp; Refund</a>
          <a className="text-body" href="#"><i className="fa fa-angle-right text-white mr-2" />Help &amp; FQAs</a>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-5">
        <h4 className="text-uppercase text-light mb-4">Car Gallery</h4>
        <div className="row mx-n1">
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-1.jpg" alt /></a>
          </div>
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-2.jpg" alt /></a>
          </div>
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-3.jpg" alt /></a>
          </div>
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-4.jpg" alt /></a>
          </div>
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-5.jpg" alt /></a>
          </div>
          <div className="col-4 px-1 mb-2">
            <a href><img className="w-100" src="img/gallery-6.jpg" alt /></a>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 mb-5">
        <h4 className="text-uppercase text-light mb-4">Newsletter</h4>
        <p className="mb-4">Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
        <div className="w-100 mb-3">
          <div className="input-group">
            <input type="text" className="form-control bg-dark border-dark" style={{padding: 25}} placeholder="Your Email" />
            <div className="input-group-append">
              <button className="btn btn-primary text-uppercase px-3">Sign Up</button>
            </div>
          </div>
        </div>
        <i>Lorem sit sed elitr sed kasd et</i>
      </div>
    </div>
  </div>
  <div className="container-fluid bg-dark py-4 px-sm-3 px-md-5">
    <p className="mb-2 text-center text-body">© <a href="#">Your Site Name</a>. All Rights Reserved.</p>
    {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}					
    <p className="m-0 text-center text-body">Designed by <a href="https://htmlcodex.com">HTML Codex</a></p>
  </div>
  {/* Footer End */}
        </div>
    )
}
export default Footer