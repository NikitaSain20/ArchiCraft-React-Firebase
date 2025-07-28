import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function Queries() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const getQueries = () => {
      const queryRef = collection(db, "queries");

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const queries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(queries);
      });

      return () => unsubscribe();
    };

    getQueries();
  }, []);

  return (
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
              Queries
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  <a className="text-white" href="#">
                    Dashboard
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  Queries
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
              <h4 className="section-title">customer queries</h4>
              <h1 className="display-5 mb-4">Queries</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((el, index) => (
                      <tr key={el.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.subject}</td>
                        <td>{el.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
      <ToastContainer />
    </>
  );
}
