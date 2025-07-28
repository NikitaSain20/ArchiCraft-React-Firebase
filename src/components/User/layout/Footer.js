import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <>
        {/* Footer Start */}
        <div
          className="container-fluid bg-dark text-body footer mt-5 pt-5 px-0 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h3 className="text-light mb-4">Address</h3>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt text-primary me-3" />
                  123 Street, Jalandhar, Punjab
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt text-primary me-3" />
                  +012 345 67890
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope text-primary me-3" />
                  info@gmail.com
                </p>
                <div className="d-flex pt-2">
                  <a
                    className="btn btn-square btn-outline-body me-1"
                    href="https://twitter.com/?lang=en"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-body me-1"
                    href="https://www.facebook.com/"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-body me-1"
                    href="https://www.youtube.com/"
                  >
                    <i className="fab fa-youtube" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-body me-0"
                    href="https://in.linkedin.com/"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 mt-5">
                <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
                  <h1 className="text-primary  mt-5 offset-md-3">
                    <img
                      className="me-3"
                      src="/img/icons/icon-1.png"
                      alt="Icon"
                    />
                    ArchiCraft
                  </h1>
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <h3 className="text-light mb-4">Quick Links</h3>
                <Link className="btn btn-link" to={"/"}>
                  Home
                </Link>
                <Link className="btn btn-link" to={"/about"}>
                  About Us
                </Link>
                <Link className="btn btn-link" to={"/properties"}>
                  Property Types
                </Link>
                <Link className="btn btn-link" to={"/contact"}>
                  Contact Us
                </Link>
                <Link className="btn btn-link" to={"/userlogin"}>
                  User Login
                </Link>
              </div>
            </div>
          </div>
          <div className="container-fluid copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  © <a href="#">ArchiCraft</a>, All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">
                  {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                  Designed By ArchiCraft
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
      </>
    </>
  );
}
