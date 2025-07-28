import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, styleObj } from "../../../Firebase";
import { RingLoader } from "react-spinners";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  const addQueries = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (name === "" || email === "" || subject === "" || message === "") {
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
      return;
    }

    try {
      const queryRef = collection(db, "queries");

      const newQuery = {
        name,
        email,
        subject,
        message,
        status: "active",
        created_at: Timestamp.now(),
      };

      await addDoc(queryRef, newQuery);

      toast.success("Message Sent Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log(error);
    }
  };
  return (
    <>
      <>
        <RingLoader
          loading={load}
          cssOverride={styleObj}
          size={100}
          color={"#B78D65"}
        />
        <div className={load ? "d-none" : ""}>
          {/* Page Header Start */}
          <div
            className="container-fluid page-header py-5 mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className="container py-5">
              <h1 className="display-1 text-white animated slideInDown">
                Contact Us
              </h1>
              <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb text-uppercase mb-0">
                  <li className="breadcrumb-item">
                    <a className="text-white" href="#">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-primary active"
                    aria-current="page"
                  >
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* Page Header End */}
          {/* Contact Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 600 }}
              >
                <h4 className="section-title">Contact Us</h4>
                <h1 className="display-5 mb-4">
                  If You Have Any Query, Please Feel Free Contact Us
                </h1>
              </div>
              <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                      <div
                        className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                        style={{ width: 55, height: 55 }}
                      >
                        <i className="fa fa-map-marker-alt text-primary" />
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Address</p>
                        <h3 className="mb-0">123 Street,Jalandhar, Punjab</h3>
                      </div>
                    </div>
                    <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                      <div
                        className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                        style={{ width: 55, height: 55 }}
                      >
                        <i className="fa fa-phone-alt text-primary" />
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Call Us Now</p>
                        <h3 className="mb-0">+012 345 6789</h3>
                      </div>
                    </div>
                    <div className="bg-light d-flex align-items-center w-100 p-4">
                      <div
                        className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                        style={{ width: 55, height: 55 }}
                      >
                        <i className="fa fa-envelope-open text-primary" />
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Mail Us Now</p>
                        <h3 className="mb-0">info@gmail.com</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                  <form onSubmit={addQueries}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => {
                              setSubject(e.target.value);
                            }}
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: 100 }}
                            value={message}
                            onChange={(e) => [setMessage(e.target.value)]}
                          />
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Contact End */}
          {/* Google Map Start */}
          {/* <div className="container-xxl pt-5 px-0 wow fadeIn" data-wow-delay="0.1s">
            <iframe
              className="w-100 mb-n2"
              style={{ height: 450 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
              frameBorder={0}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div> */}
          {/* Google Map End */}
        </div>
        <ToastContainer />
      </>
    </>
  );
}
