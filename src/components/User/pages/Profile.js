import { useEffect, useState } from "react";
import { db, auth, styleObj } from "../../../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [load, setLoad] = useState(true);
  const nav = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       console.log(user)
  //       if (user) {
  //         const userDocRef = doc(db, "users", user.uid);
  //         const userDocSnap = await getDoc(userDocRef);

  //         if (userDocSnap.exists()) {
  //           setUserData(userDocSnap.data());
  //         } else {
  //           console.log("No such document!");
  //         }
  //       } else {
  //         console.log("No user is signed in.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoad(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const handleInputChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  // const handleSave = async () => {
  //   setLoad(true);
  //   try {
  //     const user = auth.currentUser;
  //     if (user) {
  //       const userDocRef = doc(db, "users", user.uid);
  //       await updateDoc(userDocRef, userData);
  //       setEditMode(false);
  //       toast.success("Profile Updated Successfully", {
  //         position: "top-center",
  //       });
  //       setTimeout(() => {
  //         setLoad(false);
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     toast.error("Something went wrong", {
  //       position: "top-center",
  //     });
  //     setTimeout(() => {
  //       setLoad(false);
  //     }, 2000);
  //   }
  // };
  let authenticate = sessionStorage.getItem("isLogin");
  useEffect(() => {
    if (!authenticate) {
      nav("/login");
      setTimeout(() => {
        toast.error("Please Login First");
      }, 500);
    }
  }, []);
  useEffect(() => {
    getDetails();
  }, []);
  const id = sessionStorage.getItem("id");
  const getDetails = async () => {
    setLoad(true);
    let customerRef = doc(db, "users", id);
    let customerSnap = await getDoc(customerRef);
    if (customerSnap.exists()) {
      let customerData = customerSnap.data();
      setName(customerData.name);
      setContact(customerData.contact);
      setEmail(customerData.email)
      // setAddress(customerData.address);
      setLoad(false);
    } else {
      setLoad(false);
      console.log("Error in fetching single Category");
      toast.error("Something Went Wrong");
    }
  };
  const udpateProfile = (e) => {
    e.preventDefault();
    setLoad(true)
    let userRef = doc(db, "users", id);
    try {
      updateDoc(userRef, {
        name: name,
        contact: contact,
        // address: address,
      });

      setLoad(false);
      // console.log("done")
      setEditMode(false)
      toast.success("Profile Updated Successfully");
    } catch (err) {
      setLoad(false);
      console.log("Error in updating category", err);
      toast.error("Something Went Wrong");
    }
  };

  const changeMode = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
    setEditMode(true);
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
              User Profile
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
                  User Profile
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
              <h4 className="section-title">User Profile</h4>
              <h1 className="display-5 mb-4">Manage Your Profile</h1>
            </div>
            <div className="row g-4">
              <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-5 w-100">
                  <div className="image d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-secondary mb-3">
                      <img
                        src="img/icons/user.png"
                        height={200}
                        width={200}
                        alt="Profile"
                      />
                    </button>
                    {editMode ? (
                      <>
                        <div>
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name" onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                            className="form-control"
                          />
                        </div>
                        <div>
                          <label>Email(You can not update Email):</label>
                          <input
                            type="email"
                            name="email"
                            //  onChange={(e) => {
                            //   setName(e.target.value);
                            // }}
                            value={email}
                            className="form-control"
                            readOnly
                          />
                        </div>
                        <div>
                          <label>Contact:</label>
                          <input
                            type="text"
                            name="contact"
                            onChange={(e) => {
                              setContact(e.target.value);
                            }}
                            value={contact}
                            className="form-control"
                          />
                        </div>
                        <button
                          className="btn1 btn-success btn-lg mt-3"
                          onClick={udpateProfile}
                        >
                          Save Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <h1>
                          Name:{" "}
                          <span className="name mt-3">
                            {name}
                          </span>
                        </h1>
                        <h1>
                          Email:{" "}
                          <span className="idd">
                            {email}
                          </span>
                        </h1>
                        <h1>
                          Contact:{" "}
                          <span className="idd">
                            {contact}
                          </span>
                        </h1>
                        <button
                          className="btn1 btn-primary btn-lg mt-3"
                          onClick={changeMode}
                        >
                          Edit Profile
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service End */}
      </div>
      <ToastContainer />
    </>
  );
}
