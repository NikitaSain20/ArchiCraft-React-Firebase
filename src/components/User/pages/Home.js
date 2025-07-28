import { useEffect, useState } from "react";
import { db, styleObj } from "../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
export default function Home() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const getProperties = () => {
      const propertyRef = collection(db, "propertyTypes");

      const unsubscribe = onSnapshot(propertyRef, (snapshot) => {
        const properties = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(properties);
      });

      return () => unsubscribe();
    };

    getProperties();
  }, []);
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
          {/* Carousel Start */}
          <div
            className="container-fluid p-0 pb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className=" header-carousel position-relative">
              <div
                className=" position-relative"
                data-dot="<img src='img/carousel-1.jpg'>"
              >
                <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
                <div className="owl-carousel-inner">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-10 col-lg-8">
                        <h1 className="display-1 text-white animated slideInDown">
                          Best Architecture And Interior Design Services
                        </h1>
                        <p className="fs-5 fw-medium text-white mb-4 pb-3">
                          We provide You Design of your Dreams
                        </p>
                        <Link
                          to={"/properties"}
                          className="btn btn-primary py-3 px-5 animated slideInLeft"
                        >
                          Explore With Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Carousel End */}
          {/* Facts Start */}
          <div className="container-xxl py-5">
            <div className="container pt-5">
              <div className="row g-4">
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="img/icons/icon-2.png" alt="Icon" />
                    </div>
                    <h3 className="mb-3">Design Approach</h3>
                    <p className="mb-0">
                      Our design philosophy centers around the belief that form
                      follows function. We create spaces that are not only
                      visually stunning but also practical and tailored to the
                      unique needs of each client.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="img/icons/icon-3.png" alt="Icon" />
                    </div>
                    <h3 className="mb-3">Innovative Solutions</h3>
                    <p className="mb-0">
                      From residential interiors to commercial spaces, our team
                      excels in creating environments that reflect the
                      personality and vision of our clients
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                    <div className="fact-icon">
                      <img src="img/icons/icon-4.png" alt="Icon" />
                    </div>
                    <h3 className="mb-3">Project Management</h3>
                    <p className="mb-0">
                      Our team is composed of talented designers and architects
                      who bring a wealth of experience and a deep love for
                      design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Facts End */}
          {/* About Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                  <div className="about-img">
                    <img className="img-fluid" src="img/about-1.jpg" alt="" />
                    <img className="img-fluid" src="img/about-2.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                  <h4 className="section-title">About Us</h4>
                  <h1 className="display-5 mb-4">
                    A Creative Architecture Agency For Your Dream Home
                  </h1>
                  <p>
                    At Architect, we believe that every space tells a story.
                    With a passion for design and a commitment to excellence, we
                    transform ordinary spaces into extraordinary environments
                    that inspire and delight.
                  </p>
                  <p className="mb-4">
                    Our design philosophy centers around the belief that form
                    follows function. We create spaces that are not only
                    visually stunning but also practical and tailored to the
                    unique needs of each client.
                  </p>
                  <div className="d-flex align-items-center mb-5">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                      style={{ width: 120, height: 120 }}
                    >
                      <h1 className="display-1 mb-n2" data-toggle="counter-up">
                        25
                      </h1>
                    </div>
                    <div className="ps-4">
                      <h3>Years</h3>
                      <h3>Working</h3>
                      <h3 className="mb-0">Experience</h3>
                    </div>
                  </div>
                  <Link className="btn btn-primary py-3 px-5" to={"/about"}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* About End */}
          {/* Service Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 600 }}
              >
                <h4 className="section-title">Our Property Types</h4>
                <h1 className="display-5 mb-4">
                  We Focused On Modern Architecture And Interior Design
                </h1>
              </div>
              <div className="row g-4">
                {data.slice(0, 9).map((property, index) => (
                  <>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src={property.imageUrl}
                          alt=""
                        />
                        <div className="service-text p-5 w-100">
                          <h3 className="mb-3">{property.propertyName}</h3>
                          <p className="mb-4">{property.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          {/* Service End */}
          {/* Feature Start */}
          <div className="container-xxl py-5">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                  <h4 className="section-title">Why Choose Us!</h4>
                  <h1 className="display-5 mb-4">
                    Why You Should Trust Us? Learn More About Us!
                  </h1>
                  <p className="mb-4">
                    At Architect, we believe that every space tells a story.
                    With a passion for design and a commitment to excellence, we
                    transform ordinary spaces into extraordinary environments
                    that inspire and delight.
                  </p>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <img
                          className="flex-shrink-0"
                          src="img/icons/icon-2.png"
                          alt="Icon"
                        />
                        <div className="ms-4">
                          <h3>Design Approach</h3>
                          <p className="mb-0">
                            Our design philosophy centers around the belief that
                            form follows function. We create spaces that are not
                            only visually stunning but also practical and
                            tailored to the unique needs of each client.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <img
                          className="flex-shrink-0"
                          src="img/icons/icon-3.png"
                          alt="Icon"
                        />
                        <div className="ms-4">
                          <h3>Innovative Solutions</h3>
                          <p className="mb-0">
                            From residential interiors to commercial spaces, our
                            team excels in creating environments that reflect
                            the personality and vision of our clients
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <img
                          className="flex-shrink-0"
                          src="img/icons/icon-4.png"
                          alt="Icon"
                        />
                        <div className="ms-4">
                          <h3>Project Management</h3>
                          <p className="mb-0">
                            Our team is composed of talented designers and
                            architects who bring a wealth of experience and a
                            deep love for design.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                  <div className="feature-img">
                    <img className="img-fluid" src="img/about-2.jpg" alt="" />
                    <img className="img-fluid" src="img/about-1.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Feature End */}
          {/* Team Start */}
          {/* <div className="container-xxl py-5">
            <div className="container">
              <div
                className="text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 600 }}
              >
                <h4 className="section-title">Team Members</h4>
                <h1 className="display-5 mb-4">
                  We Are Creative Architecture Team For Your Dream Home
                </h1>
              </div>
              <div className="row g-0 team-items">
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="team-item position-relative">
                    <div className="position-relative">
                      <img className="img-fluid" src="img/team-1.jpg" alt="" />
                      <div className="team-social text-center">
                        <a className="btn btn-square" href="">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-twitter" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                    <div className="bg-light text-center p-4">
                      <h3 className="mt-2">Kriti</h3>
                      <span className="text-primary">Senior Architect</span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="team-item position-relative">
                    <div className="position-relative">
                      <img className="img-fluid" src="img/team-2.jpg" alt="" />
                      <div className="team-social text-center">
                        <a className="btn btn-square" href="">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-twitter" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                    <div className="bg-light text-center p-4">
                      <h3 className="mt-2">Karan</h3>
                      <span className="text-primary">Architect</span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="team-item position-relative">
                    <div className="position-relative">
                      <img className="img-fluid" src="img/team-3.jpg" alt="" />
                      <div className="team-social text-center">
                        <a className="btn btn-square" href="">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-twitter" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                    <div className="bg-light text-center p-4">
                      <h3 className="mt-2">Vishal</h3>
                      <span className="text-primary">Architect</span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="team-item position-relative">
                    <div className="position-relative">
                      <img className="img-fluid" src="img/team-4.jpg" alt="" />
                      <div className="team-social text-center">
                        <a className="btn btn-square" href="">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-twitter" />
                        </a>
                        <a className="btn btn-square" href="">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                    <div className="bg-light text-center p-4">
                      <h3 className="mt-2">Adrezz</h3>
                      <span className="text-primary">Architect</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* Team End */}
        </div>
      </>
    </>
  );
}
