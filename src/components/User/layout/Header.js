import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const nav = useNavigate();
  var isLogin = sessionStorage.getItem("isLogin");
  const logout = () => {
    sessionStorage.clear();
    nav("/");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };
  return (
    <>
      {/* Navbar Start */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <a href="/" className="navbar-brand ms-4 ms-lg-0">
          <h1 className="text-primary m-0">
            <img className="me-3" src="img/icons/icon-1.png" alt="Icon" />
            ArchiCraft
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink to={"/"} className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to={"/about"} className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to={"/properties"} className="nav-item nav-link">
              Property Types
            </NavLink>
            <NavLink to={"/contact"} className="nav-item nav-link">
              Contact
            </NavLink>
            <NavLink to={"/reviews"} className="nav-item nav-link">
              Reviews
            </NavLink>
            {isLogin ? (
              <>
                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle text-dark"
                    data-bs-toggle="dropdown"
                  >
                    User
                  </Link>
                  <div className="dropdown-menu border-0 m-0">
                    <Link to={"/profile"} className="dropdown-item">
                      Profile
                    </Link>
                    <Link to={"/order"} className="dropdown-item">
                      Make Order
                    </Link>
                    <Link to={"/myorders"} className="dropdown-item">
                      My Orders
                    </Link>
                    <Link to={"/myreviews"} className="dropdown-item">
                      My Reviews
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // <Link to="/register" className="nav-item nav-link" >Register</Link>

              <NavLink to={"/register"} className="nav-item nav-link">
                Register
              </NavLink>

            )}
          </div>
          {isLogin ? (
            <>
              <a
                onClick={logout}
                className="btn btn-primary py-2 px-4 d-none d-lg-block"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn btn-primary py-2 px-4 d-none d-lg-block"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
