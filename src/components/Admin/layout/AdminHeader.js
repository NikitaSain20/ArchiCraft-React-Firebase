import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AdminHeader() {
  const nav = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    nav("/login");
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
  };
  return (
    <>
      <>
        {/* Navbar Start */}
        <nav
          className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
            <h1 className="text-primary m-0">
              <img className="me-3" src="/img/icons/icon-1.png" alt="Icon" />
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
              <NavLink
                to={"/admin/dashboard"}
                className="nav-item nav-link"
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/admin/managecustomers"}
                className="nav-item nav-link"
              >
                Customers
              </NavLink>
              <div className="nav-item dropdown">
                <Link
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Property Type
                </Link>
                <div className="dropdown-menu border-0 m-0">
                  <Link to={"/admin/addproperties"} className="dropdown-item">
                    Add Property Type
                  </Link>
                  <Link to={"/admin/manageproperties"} className="dropdown-item">
                    Manage Property Type
                  </Link>

                </div>
              </div>
              <div className="nav-item dropdown">
                <Link
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Orders
                </Link>
                <div className="dropdown-menu border-0 m-0">
                  <Link to={"/admin/pendingorders"} className="dropdown-item">
                    Pending Orders
                  </Link>
                  <Link to={"/admin/approvedorders"} className="dropdown-item">
                    Approved Orders
                  </Link>
                  <Link to={"/admin/rejectedorders"} className="dropdown-item">
                    Rejected Orders
                  </Link>
                  <Link to={"/admin/completedorders"} className="dropdown-item">
                    Completed Orders
                  </Link>
                  <Link to={"/admin/canceledorders"} className="dropdown-item">
                    Canceled Orders
                  </Link>
                </div>
              </div>
              <NavLink to={"/admin/managereviews"} className="nav-item nav-link">
                Manage Reviews
              </NavLink>
              <NavLink to={"/admin/queries"} className="nav-item nav-link">
                Customer Queries
              </NavLink>
            </div>
            <div>
              {/* <a href="#" onClick={logout}>
                LOGOUT
              </a> */}
              <a
                href=""
                onClick={logout}
                className="btn btn-primary py-2 px-4 d-none d-lg-block"
              >
                Log Out
              </a>
            </div>
          </div>
        </nav>
        {/* Navbar End */}
      </>
    </>
  );
}
