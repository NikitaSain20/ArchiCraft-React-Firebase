import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function ManagePropertyTypes() {
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

  const handleDelete = async (id) => {
    setLoad(true);
    try {
      const propertyDoc = doc(db, "propertyTypes", id);
      await deleteDoc(propertyDoc);
      toast.success("Status Updated Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      setData((prevData) => prevData.filter((property) => property.id !== id));
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.error("Error deleting document: ", error);
    }
  };

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
              Manage Property Types
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  <a className="text-white">Dashboard</a>
                </li>
                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  Manage Property Types
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
              <h4 className="section-title">Property Types</h4>
              <h1 className="display-5 mb-4">Manage Property Types</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Property Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((property, index) => (
                      <tr key={property.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{property.propertyName}</td>
                        <td>
                          <img
                            src={property.imageUrl}
                            alt={property.propertyName}
                            style={{ width: "100px", height: "auto" }}
                          />
                        </td>
                        <td>{property.description}</td>
                        <td>
                          <Link to={`/admin/updateproperties/${property.id}`}>
                            <button className="btn btn-primary">Update</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(property.id)}
                          >
                            Delete
                          </button>
                        </td>
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
