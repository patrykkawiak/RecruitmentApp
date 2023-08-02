import { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import classes from "../../style/inputs.module.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)

  const color = useSelector((state) => state.theme.color);

  const submit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        setRedirect(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={submit} className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-3xl">Login Page</h1>
        <div className={classes.inputCtn}>
          <input
            className={classes.input}
            type="email"
            name="email"
            id="email"
            value={email}
            style={{ borderColor: color }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className={classes.entered}>
            Email
          </label>
        </div>
        <div className={classes.inputCtn}>
          <input
            className={classes.input}
            type="password"
            name="password"
            id="password"
            value={password}
            style={{ borderColor: color }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="email" className={classes.entered}>
            Password
          </label>
        </div>
        <button className={`mt-4 px-4 py-2 text-white text-xl transition transform duration-300 hover:scale-95 rounded-lg`}
      style={{ backgroundColor: color }} type="submit">Login</button>
       {redirect && <Navigate to="/admin" />}
      </form>
    </>
  );
};
export default Login;
