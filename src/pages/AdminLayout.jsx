import { Outlet, Navigate } from "react-router-dom";
import AdminNav from "../components/layouts/AdminNav";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
const AdminLayout = () => {
  const [nav, setNav] = useState(true);
  const color = useSelector((state) => state.theme.color);

  const [userAuth, setUserAuth] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(true);
      } else {
        setUserAuth(false);
      }


	  return () => {
		listen();
	  }
    });
  },[]);

  const handleCloseNav = () => {
    setNav((prev) => !prev);
  };

  return !userAuth ? (
    <Navigate to="/" />
  ) : (
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
