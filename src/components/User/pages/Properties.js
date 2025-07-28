import { useEffect, useState } from "react";
import { db, styleObj } from "../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Properties() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const nav = useNavigate();
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
          {/* Page Header Start */}
          <div
            className="container-fluid page-header py-5 mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <div className="container py-5">
              <h1 className="display-1 text-white animated slideInDown">
                Property Types
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
                    Property Types
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* Page Header End */}

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
                {data.map((property, index) => (
                  <>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                      onClick={() => {
                        nav("/properties");
                      }}
                      key={index}
                      style={{ cursor: "pointer" }}
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
        </div>
        {/* Service End */}
      </>
    </>
  );
}
