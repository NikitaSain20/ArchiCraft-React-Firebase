import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../../../Firebase";

export default function MyReviews() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 500);

  useEffect(() => {
    getMyReviews(sessionStorage.getItem("id"));
  });

  const getMyReviews = (userId) => {
    try {
      const reviewQuery = query(
        collection(db, "reviews"),
        where("userId", "==", userId)
      );

      onSnapshot(reviewQuery, (reviewSnapshot) => {
        const reviews = reviewSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const ordersRef = collection(db, "orders");
        onSnapshot(ordersRef, (orderSnapshot) => {
          const orders = orderSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const propertyTypesRef = collection(db, "propertyTypes");
          onSnapshot(propertyTypesRef, (propertyTypeSnapshot) => {
            const propertyTypes = propertyTypeSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            const joinedData = reviews.map((review) => {
              const order = orders.find((ord) => ord.id === review.orderId);
              const propertyType = propertyTypes.find(
                (prop) => prop.id === order?.propertyId
              );
              return {
                ...review,
                order,
                propertyType,
              };
            });

            setData(joinedData);
            setLoad(false);
          });
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
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
              My Reviews
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
                  My Reviews
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Orders Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Reviews</h4>
              <h1 className="display-5 mb-4">My Reviews</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <div className="table-responsive">
                  {data.length === 0 ? (
                    <div
                      className="alert alert-warning text-center"
                      role="alert"
                    >
                      Currently You haven't uploaded any review
                    </div>
                  ) : (
                    <>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Order Details</th>
                            <th scope="col">Review Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((review, index) => (
                            <tr key={review.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <strong>Property Type:</strong>{" "}
                                {review.propertyType?.propertyName}
                                <br />
                                <strong>Order ID:</strong> {review.order?.id}
                                <br />
                                <strong>Dimensions:</strong>{" "}
                                {review.order?.dimensions}
                                <br />
                                <strong>Description:</strong>{" "}
                                {review.order?.description}
                              </td>
                              <td>
                                <strong>Rating(out of 5):</strong>{" "}
                                {review.rating}
                                <br />
                                <strong>Comments:</strong> {review.comment}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Orders End */}
      </div>
      <ToastContainer />
    </>
  );
}
