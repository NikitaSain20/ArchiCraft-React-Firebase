import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Master from "./components/User/layout/Master";
import Home from "./components/User/pages/Home";
import About from "./components/User/pages/About";
import Properties from "./components/User/pages/Properties";
import Contact from "./components/User/pages/Contact";
import AdminMaster from "./components/Admin/layout/AdminMaster";
import Dashboard from "./components/Admin/pages/Dashboard";
import ManageCustomers from "./components/Admin/pages/ManageCustomers";
import AddPropertyType from "./components/Admin/pages/AddPropertyType";
import ManagePropertyTypes from "./components/Admin/pages/ManagePropertyTypes";
import UpdatePropertyType from "./components/Admin/pages/UpdatePropertyTypes";
import Order from "./components/User/pages/Order";
import MyOrders from "./components/User/pages/MyOrders";
import PendingOrders from "./components/Admin/pages/PendingOrders";
import ApprovedOrders from "./components/Admin/pages/ApprovedOrders";
import RejectedOrders from "./components/Admin/pages/RejectedOrders";
import CompletedOrders from "./components/Admin/pages/CompletedOrders";
import CanceledOrders from "./components/Admin/pages/CanceledOrders";
import ReviewForm from "./components/User/pages/ReviewForm";
import ManageReviews from "./components/Admin/pages/ManageReveiws";
import MyReviews from "./components/User/pages/MyReviews";
import Reviews from "./components/User/pages/Reviews";
import Profile from "./components/User/pages/Profile";
import Queries from "./components/Admin/pages/Queries";
import Login from "./components/Authentication/Login";
import RegisterUser from "./components/User/pages/RegisterUser";
import ManageArchitect from "./components/Admin/pages/ManageArchitect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/order" element={<Order />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/review/:id" element={<ReviewForm />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<RegisterUser />} />
          </Route>
          <Route path="/admin" element={<AdminMaster />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/managecustomers"
              element={<ManageCustomers />}
            />
            <Route
              path="/admin/managearchitect"
              element={<ManageArchitect />}
            />
            <Route path="/admin/addproperties" element={<AddPropertyType />} />
            <Route
              path="/admin/manageproperties"
              element={<ManagePropertyTypes />}
            />
            <Route
              path="/admin/updateproperties/:id"
              element={<UpdatePropertyType />}
            />
            <Route path="/admin/pendingorders" element={<PendingOrders />} />
            <Route path="/admin/approvedorders" element={<ApprovedOrders />} />
            <Route path="/admin/rejectedorders" element={<RejectedOrders />} />
            <Route
              path="/admin/completedorders"
              element={<CompletedOrders />}
            />
            <Route path="/admin/canceledorders" element={<CanceledOrders />} />
            <Route path="/admin/managereviews" element={<ManageReviews />} />
            <Route path="/admin/queries" element={<Queries />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
