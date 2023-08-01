import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useEffect, useState } from "react";

const Details = (params) => {
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
        console.log("object");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {user ? (
        <>
          <p>{`Signed as ${user.email}`}</p>
          <button onClick={userSignOut}>Sing out</button>
        </>
      ) : (
        <p>Signed out</p>
      )}
    </div>
  );
};

export default Details