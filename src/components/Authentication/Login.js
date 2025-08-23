import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { auth, db, styleObj } from "../../Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
export default function Login() {
  let nav = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [load, setLoad] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      setLoad(false);

      const user = res.user;
      console.log(user);
      checkUser(res.user.uid);
    } catch (err) {
      setLoad(false);
      console.log("error in login:", err);
      toast.error(err.message);
    }
  };
  const checkUser = (uid) => {
    setLoad(true);

    let userRef = collection(db, "/users");
    let que = query(userRef, where("uid", "==", uid));
    console.log(que);
    onSnapshot(que, (querySnapshot) => {
      let uData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoad(false);

      if (uData[0].userType == 1) {
        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("id", uData[0].id);
        sessionStorage.setItem("userType", uData[0].userType);
        nav("/admin/dashboard");
        setTimeout(() => {
          toast.success("Welcome Admin");
        }, 700);
      }
      // else if (uData[0].userType == 2) {
      //   if (uData[0].status == true) {
      //     sessionStorage.setItem("isLogin", "true");
      //     sessionStorage.setItem("id", uData[0].id);
      //     sessionStorage.setItem("userType", uData[0].userType);
      //     sessionStorage.setItem("uData", JSON.stringify(uData[0]));
      //     nav("/architect");
      //     setTimeout(() => {
      //       toast.success("Welcome " + uData[0].name);
      //     }, 700);
      //   } else {
      //     toast.error("In-Active Account, Please Contact Admin");
      //   }
      // }
      else if (uData[0].userType == 3) {
        if (uData[0].status == true) {
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("id", uData[0].id);
          sessionStorage.setItem("userType", uData[0].userType);
          sessionStorage.setItem("uData", JSON.stringify(uData[0]));
          nav("/");
          setTimeout(() => {
            toast.success("Welcome " + uData[0].name);
          }, 700);
        } else {
          toast.error("In-Active Account, Please Contact Admin");
        }
      } else {
        toast.error("Invalid Credentials");
      }
    });
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
            <h1 className="display-1 text-white animated slideInDown">Login</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb text-uppercase mb-0">
                <li className="breadcrumb-item">
                  {/* <a className="text-white" href="#">
                    Home
                  </a> */}
                  <Link className="text-white" to="/">
                    Home
                  </Link>
                </li>
                <li
                  className="breadcrumb-item text-primary active"
                  aria-current="page"
                >
                  Login
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
              <h4 className="section-title">Login</h4>
              <h1 className="display-5 mb-4">Login Here</h1>
            </div>
            <div className="row g-5">
              <div
                className="col-lg-6 offset-md-3 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={loginSubmit}>
                  <div className="row g-3">
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
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Login
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
