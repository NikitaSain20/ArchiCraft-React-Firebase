import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { ToastContainer } from "react-toastify";

export default function AdminMaster() {
  return (
    <>
      <ToastContainer />
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </>
  );
}
