import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export default function ApprovedOrders() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [priceInputs, setPriceInputs] = useState({});
  const nav = useNavigate();

  // setTimeout(() => {
  //   setLoad(false);
  // }, 2000);

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

            const approvedOrders = joinedData.filter(
              (order) => order.status === "Approved"
            );
            setData(approvedOrders);
          });
        });
      });
      setLoad(false)
      return () => {
        unsubscribeOrders();
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const rejectOrder = async (orderId) => {
    setLoad(true);
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: "Rejected" });
      toast.success("Order Rejected successfully!");
      setTimeout(() => {
        setLoad(false);
        nav("/admin/rejectedorders");
      }, 500);
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error("Failed to reject the order.");
    }
  };

  const completedOrder = async (orderId) => {
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { status: "Completed" });
      toast.success("Order Status Updated successfully!");
      setTimeout(() => {
        nav("/admin/completedorders");
      }, 500);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to Update the order status.");
    }
  };

  const handlePriceInputChange = (orderId, event) => {
    setPriceInputs({ ...priceInputs, [orderId]: event.target.value });
  };

  const handleSavePrice = async (orderId) => {
    setLoad(true);
    try {
      const price = priceInputs[orderId];
      if (!price) {
        toast.error("Please enter a price.");
        return;
      }

      const orderDocRef = doc(db, "orders", orderId);
      await updateDoc(orderDocRef, { totalPrice: price });

      toast.success("Total Price saved successfully!");
      setTimeout(() => {
        setLoad(false);
      }, 2000);

      setData((prevData) =>
        prevData.map((order) =>
          order.id === orderId ? { ...order, totalPrice: price } : order
        )
      );
    } catch (error) {
      console.error("Error saving total price:", error);
      toast.error("Failed to save total price.");

      setLoad(false);

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
              Approved Orders
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
                  Approved Orders
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
              <h1 className="display-5 mb-4">Approved Orders</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                {data.length === 0 ? (
                  <div className="alert alert-warning text-center" role="alert">
                    No Approved orders available.
                  </div>
                ) : (
                  <>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sr No.</th>
                          <th scope="col" style={{ width: "200px" }}>Property Type Details</th>
                          <th scope="col">Image</th>
                          <th scope="col">User Details</th>
                          <th scope="col">Order Details</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Order Status</th>
                          <th scope="col">Reject</th>
                          <th scope="col">Action</th>
                          <th scope="col">Total Price</th>
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
                                className="btn btn-danger"
                                onClick={() => rejectOrder(order.id)}
                              >
                                Reject
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => completedOrder(order.id)}
                              >
                                Completed
                              </button>
                            </td>
                            <td>
                              {order.totalPrice ? (
                                <span>Rs.{order.totalPrice}</span>
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Enter Total Price"
                                    value={priceInputs[order.id] || ""}
                                    onChange={(e) =>
                                      handlePriceInputChange(order.id, e)
                                    }
                                  />
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => handleSavePrice(order.id)}
                                  >
                                    Save Price
                                  </button>
                                </>
                              )}
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
