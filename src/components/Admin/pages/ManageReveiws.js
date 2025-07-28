import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function ManageReviews() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const nav = useNavigate();

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const timeout = setTimeout(() => setLoad(false), 2000);
    getOrders();
    return () => clearTimeout(timeout);
  }, []);

  const getOrders = () => {
    try {
      const ordersRef = collection(db, "orders");
      const usersRef = collection(db, "users");
      const reviewsRef = collection(db, "reviews");
      const propertyTypesRef = collection(db, "propertyTypes");

      const unsubscribeOrders = onSnapshot(ordersRef, (orderSnapshot) => {
        const orders = orderSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        onSnapshot(usersRef, (userSnapshot) => {
          const users = userSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          onSnapshot(reviewsRef, (reviewSnapshot) => {
            const reviews = reviewSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            onSnapshot(propertyTypesRef, (propertyTypeSnapshot) => {
              const propertyTypes = propertyTypeSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));

              const joinedData = reviews.map((review) => {
                const order = orders.find((ord) => ord.id === review.orderId);
                const user = users.find((usr) => usr.id === review.userId);
                const propertyType = propertyTypes.find(
                  (prop) => prop.id === order?.propertyId
                );
                return {
                  ...review,
                  order,
                  user,
                  propertyType,
                };
              });

              setData(joinedData);
            });
          });
        });
      });

      return () => {
        unsubscribeOrders();
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (id) => {
    setLoad(true);
    try {
      const reviewDoc = doc(db, "reviews", id);
      await deleteDoc(reviewDoc);
      toast.success("Status Updated Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      setData((prevData) => prevData.filter((review) => review.id !== id));
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
              Manage Reviews
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
                  Manage Reviews
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Reviews Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Reviews</h4>
              <h1 className="display-5 mb-4">Manage Reviews</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">User Details</th>
                      <th scope="col">Order Details</th>
                      <th scope="col">Rating (Out Of 5)</th>
                      <th scope="col">Comment</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((review, index) => (
                      <tr key={review.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <li>
                            <span>Name:</span> {review.user?.name}
                          </li>
                          <li>
                            <span>Email:</span> {review.user?.email}
                          </li>
                          <li>
                            <span>Contact:</span> {review.user?.contact}
                          </li>
                        </td>
                        <td>
                          <li>
                            <span>Order Id:</span> {review.order?.id}
                          </li>
                          <li>
                            <span>Property Type:</span>{" "}
                            {review.propertyType?.propertyName}
                          </li>
                          <li>
                            <span>Dimensions:</span> {review.order?.dimensions}
                          </li>
                          <li>
                            <span>Description:</span>{" "}
                            {review.order?.description}
                          </li>
                        </td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(review.id)}
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
      {/* Reviews End */}
      <ToastContainer />
    </>
  );
}
