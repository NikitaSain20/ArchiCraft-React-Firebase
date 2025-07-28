import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db, styleObj } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation
import { RingLoader } from "react-spinners";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (name === "" || email === "" || password === "" || contact === "") {
      setLoad(false);
      toast.error("All Fields are mandatory", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      setLoad(false);
      toast.error("Password should contain at least 6 characters");
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        const newUser = {
          name,
          email,
          contact,
          uid: user.uid,
          userType: 3,
          status: true,
          created_at: Timestamp.now(),
        };

        const userRef = collection(db, "users");
        await addDoc(userRef, newUser);

        toast.success("User registered successfully", {
          position: "top-center",
        });
        setLoad(false);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setLoad(false);
          toast.error("Email already exists", {
            position: "top-center",
          });
        } else {
          setLoad(false);
          toast.error("Something went wrong!!!", {
            position: "top-center",
          });
          console.log("Error details:", error);
        }
      }
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
              User Register
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
                  Register
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
              <h4 className="section-title">User Register</h4>
              <h1 className="display-5 mb-4">Register Here</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={handleRegister}>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Your Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="contact"
                          placeholder="Your Contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          pattern="\d{10}"
                          title="Please Enter 10 Digits"
                        />
                        <label htmlFor="contact">Your Contact</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
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
