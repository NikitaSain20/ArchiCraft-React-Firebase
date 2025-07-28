export default function AdminFooter() {
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
              <div className="col-lg-6 col-md-6 mt-5 offset-md-5">
                <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
                  <h1 className="text-primary  mt-5">
                    <img
                      className="me-3"
                      src="/img/icons/icon-1.png"
                      alt="Icon"
                    />
                    ArchiCraft
                  </h1>
                </a>
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
