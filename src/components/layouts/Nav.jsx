import { Link } from "react-router-dom";
import Icon from "../../assets/ico/icon.png";
import { useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useEffect, useState } from "react";
const Nav = () => {
  const color = useSelector((state) => state.theme.color);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((err) => console.log(err));
  };


  return (
    <nav className="h-24 shadow-md">
      <div className="wrapper">
        <div className="flex justify-between items-center h-full px-4">
          <Link
            to="/"
            className="flex items-center p-4 gap-x-3"
            style={{ color }}
          >
            <img src={Icon} alt="logo" className="h-10" />
            <div className={"text-4xl"}>BetterJob</div>
          </Link>
          <div className="flex">
            {user && (
              <Link
                className="text-xl p-4 hover:scale-110 duration-300"
                to="/admin"
                style={{ color }}
              >
                Recruiter panel
              </Link>
            )}
            {!user && (
              <>
                <Link
                  className="text-xl p-4 hover:scale-110 duration-300"
                  to="/login"
                  style={{ color }}
                >
                  Login
                </Link>
                <Link
                  className="text-xl p-4 hover:scale-110 duration-300"
                  to="/register"
                  style={{ color }}
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <Link
                className="text-xl p-4 hover:scale-110 duration-300"
                to="/"
                style={{ color }}
                onClick={userSignOut}
              >
                Sign Out
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
