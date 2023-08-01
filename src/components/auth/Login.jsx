import { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Details from "./Details";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then((useCredential) => {
            console.log(useCredential);
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <>
    <Details/>
    <form onSubmit={submit}>
      <h1>Login</h1>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
    </>
  );
};
export default Login;
