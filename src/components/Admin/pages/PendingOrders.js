import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { RingLoader } from "react-spinners";

export default function PendingOrders() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();


  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    try {
      setLoad(true)
      const propertyTypesRef = collection(db, "propertyTypes");
      const ordersRef = collection(db, "orders");
      const usersRef = collection(db, "users");

      const unsubscribeOrders = onSnapshot(ordersRef, (orderSnapshot) => {
        const orders = orderSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        onSnapshot(propertyTypesRef, (propertyTypeSnapshot) => {
          const propertyTypes = propertyTypeSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          onSnapshot(usersRef, (userSnapshot) => {
            const users = userSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            const joinedData = orders.map((order) => {
              const propertyTypeData = propertyTypes.find(
                (prop) => prop.id === order.propertyId
              );
              const user = users.find((usr) => usr.id === order.userId);
              return {
                ...order,
                propertyTypeData,
                user,
                orderUrl: order.imageUrl,
              };
            });

            const pendingOrders = joinedData.filter(
              (order) => order.status === "Pending"
            );
            setData(pendingOrders);
            setLoad(false)
          });
        });
      });

      return () => {
        unsubscribeOrders();
      };
    } catch (error) {
      setLoad(false)
      console.error("Error fetching orders:", error);
    }
  };

  const approveOrder = async (orderId) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: "Approved" });
      toast.success("Order Approved successfully!");
      setTimeout(() => {
        nav("/admin/approvedorders");
      }, 500);
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error("Failed to approving the order.");
    }
  };
  const rejectOrder = async (orderId) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: "Rejected" });
      toast.success("Order Rejected successfully!");
      setTimeout(() => {
        nav("/admin/rejectedorders");
      }, 500);
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error("Failed to reject the order.");
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
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <h1 className="display-1 text-white animated slideInDown">
              Pending Orders
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
                  Pending Orders
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 600 }}
            >
              <h4 className="section-title">Orders</h4>
              <h1 className="display-5 mb-4">Pending Orders</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                {data.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    No pending orders available.
                  </div>
                ) : (
                  <>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col">Property Type Details</th>
                          <th scope="col">Image</th>
                          <th scope="col">User Details</th>
                          <th scope="col">Order Details</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Order Status</th>
                          <th scope="col">Approve</th>
                          <th scope="col">Reject</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((order, index) => (
                          <tr key={order.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <li>
                                <span className="text-primary">Name:</span>
                                <br />
                                {order.propertyTypeData.propertyName}
                              </li>
                              <li>
                                <span className="text-primary">
                                  Description:
                                </span>
                                <br />
                                {order.propertyTypeData.description}
                              </li>
                            </td>
                            <td>
                              <img
                                src={order.propertyTypeData.imageUrl}
                                alt="Order"
                                style={{ height: "150px" }}
                              />
                            </td>
                            <td>
                              <li>
                                <span className="text-primary">Name:</span>
                                <br />
                                {order.user?.name}
                              </li>
                              <li>
                                <span className="text-primary">Email:</span>
                                <br />
                                {order.user?.email}
                              </li>
                              <li>
                                <span className="text-primary">Contact:</span>
                                <br />
                                {order.user?.contact}
                              </li>
                            </td>
                            <td>
                              {order.details}
                              <li>
                                <span className="text-primary">
                                  Dimensions:
                                </span>
                                <br />
                                {order.dimensions}
                              </li>
                              <li>
                                <span className="text-primary">
                                  Description:
                                </span>
                                <br />
                                {order.description}
                              </li>
                              <button
                                className="btn btn-primary mt-2"
                                onClick={() =>
                                  window.open(order.orderUrl, "_blank")
                                }
                                disabled={!order.orderUrl}
                              >
                                View Order Image
                              </button>
                            </td>
                            <td>{order.paymentStatus}</td>
                            <td>{order.status}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => approveOrder(order.id)}
                              >
                                Approve
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => rejectOrder(order.id)}
                              >
                                Reject
                              </button>
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
      <ToastContainer />
    </>
  );
}
