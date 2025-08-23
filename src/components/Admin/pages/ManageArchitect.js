import React, { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

export default function ManageArchitect() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const filteredUsers = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.userType === 2);

        setUsers(filteredUsers);
      },
      (error) => {
        console.error("Error fetching users data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleBlockUser = async (userId) => {
    setLoad(true);
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, {
        status: "blocked",
      });
      toast.success("User Status Updated Sucessfully", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } catch (error) {
      console.error("Error blocking user: ", error);
    }
  };
  const handleActiveUser = async (userId) => {
    setLoad(true);
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, {
        status: "active",
      });
      toast.success("User Status Updated Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log("User active successfully");
    } catch (error) {
      console.error("Error blocking user: ", error);
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
              Manage Architect
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
                  Manage Architect
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
              <h4 className="section-title">Architect</h4>
              <h1 className="display-5 mb-4">Manage Architect</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.5s">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>{user.status ? "Active" : "Blocked"}</td>
                        {user.status === true ? (
                          <>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleBlockUser(user.id)}
                              >
                                Block
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleActiveUser(user.id)}
                              >
                                Active
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
