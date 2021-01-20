import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://media1.thehungryjpeg.com/thumbs2/ori_3809182_ovmcut3mx7mngypwitwglmb2q62k2lcfrz2848s5_monogram-xb-logo-design.jpg"
        />
      </Link>

      <div className="login__container">
        <h1>Welcome to Xero-Bill</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Log in
          </button>

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Log in using Google
          </button>

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Log in using Mobile Number
          </button>
        </form>

        <p>
          By continuing, you agree to the Xero-Bill's{" "}
          <b>Terms of Service, Privacy Policy</b>
        </p>

        <button onClick={register} className="login__registerButton">
          Not on Xero-Bill yet? Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
