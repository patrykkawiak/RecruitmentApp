import { Outlet } from "react-router-dom";
import AdminNav from "../components/layouts/AdminNav";
import { useState } from "react";
import { useSelector } from "react-redux";
const AdminLayout = () => {
  const [nav, setNav] = useState(false);
  const color = useSelector((state) => state.theme.color);

  const handleCloseNav = () => {
    setNav((prev) => !prev);
  };

  return (
    <div className="flex h-full w-full">
      <button
        onClick={handleCloseNav}
        className="md:hidden z-40 absolute h-40 w-8 bg-slate-300 duration-200 text-3xl text-white rounded-r-lg"
        style={{ left: !nav ? "15rem" : "0", backgroundColor: color }}
      >
        {nav ? ">" : "<"}
      </button>
      <AdminNav nav={nav} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
