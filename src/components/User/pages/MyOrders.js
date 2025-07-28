import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { styleObj } from "../../../Firebase";
import { db } from "../../../Firebase";
export default function MyOrders() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  // const auth = getAuth();
  // const db = getFirestore();
  // const user = auth.currentUser;

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {

    getMyOrders(sessionStorage.getItem("id"));

  }, []);

  const getMyOrders = (userId) => {
    try {
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId)
      );
      const propertyTypesRef = collection(db, "propertyTypes");

      // Listen for real-time updates on orders
      onSnapshot(ordersQuery, (orderSnapshot) => {
        const orders = orderSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Listen for real-time updates on propertyTypes
        onSnapshot(propertyTypesRef, (propertyTypesSnapshot) => {
          const propertyTypeData = propertyTypesSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          // Join orders with propertyTypes based on propertyId
          const joinedData = orders.map((order) => {
            const propertyTypes = propertyTypeData.find(
              (prop) => prop.id === order.propertyId
            );
            return {
              ...order,
              propertyTypes,
            };
          });

          setData(joinedData);
          console.log(joinedData)
        });
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoad(true);
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: "Cancelled" });
      toast.success("Order cancelled successfully!");
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel the order.");
      setTimeout(() => {
        setLoad(false);
      }, 2000);
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
              My Orders
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
                  My Orders
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
              <h4 className="section-title">Orders</h4>
              <h1 className="display-5 mb-4">My Orders</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <div className="table-responsive">
                  {data.length === 0 ? (
                    <div
                      className="alert alert-warning text-center"
                      role="alert"
                    >
                      Currently You dont Have any Orders
                    </div>
                  ) : (
                    <>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col" style={{ width: "300px" }}>Property Type Details</th>
                            <th scope="col" style={{ width: "220px" }}>Order Details</th>
                            <th scope="col" style={{ width: "500px" }}>Order Image</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((order, index) => (
                            <tr key={order.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <li>
                                  <span className="text-primary">Name:</span>
                                  {order.propertyTypes.propertyName}
                                </li>
                                <li>
                                  <span className="text-primary">
                                    Description:
                                  </span>
                                  {order.propertyTypes.description}
                                </li>
                              </td>
                              <td>
                                <li>
                                  <span className="text-primary">
                                    Dimensions:
                                  </span>
                                  {order.dimensions}
                                </li>
                                <li>
                                  <span className="text-primary">
                                    Description:
                                  </span>
                                  {order.description}
                                </li>
                              </td>
                              <td>
                                <img
                                  src={order.imageUrl}
                                  alt="Order"
                                  // height={150}
                                  // width={100%}
                                  style={{ width: "100%" }}
                                />
                              </td>
                              <td>{order.paymentStatus}</td>
                              <td>{order.status}</td>
                              <td>
                                {order.totalPrice ? (
                                  <span>Rs.{order.totalPrice}</span>
                                ) : (
                                  <>Please Wait For Approval!!</>
                                )}
                              </td>
                              {order.status === "Cancelled" ? (
                                <>
                                  <td>
                                    <h5>Your Order Has Been Canceled</h5>
                                  </td>
                                </>
                              ) : order.status === "Completed" ? (
                                <>
                                  <td>
                                    <div className="d-flex">
                                      <button
                                        className="btn btn-primary me-3"
                                        onClick={() =>
                                          window.open(
                                            order.attachmentUrl,
                                            "_blank"
                                          )
                                        }
                                        disabled={!order.attachmentUrl}
                                      >
                                        View Work
                                      </button>
                                      <Link to={`/review/${order.id}`}>
                                        <button className="btn btn-primary">
                                          Give Review
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>
                                    {order.status === "Rejected" ||
                                      order.paymentStatus === "paid" ? (
                                      <></>
                                    ) : (
                                      <>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => cancelOrder(order.id)}
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                  </td>
                                </>
                              )}
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
        {/* Contact End */}
      </div>
      <ToastContainer />
    </>
  );
}
