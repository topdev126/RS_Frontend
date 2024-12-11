import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg3 from "../../assect/images/bg/03.jpg";
import logo from "../../assect/images/logo-icon-80.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signinFailed, signinSuccess } from "../../redux/user/userSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AuthLogin() {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pwdRef = useRef();
  const emailRef = useRef();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPassword: pwdRef.current.value,
          email: emailRef.current.value,
        }),
        credentials: "include",
      });
  
      const userData = await res.json();
  
      if (userData.success === false) {
        dispatch(signinFailed(userData.message));
        toast.error(userData.message);
      } else {
        // Save token to localStorage
        localStorage.setItem('access_token', userData.token);
  
        dispatch(signinSuccess(userData));
        navigate("/");
        toast.success("Successfully Signed In");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, photoURL, role } = result.user;
      //=====Fetch The Data To Backend====//
      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email,
          phone: phoneNumber?phoneNumber:"",
          photo: photoURL,
          role,
        }),
      });
      const userData = await res.json();
      if (userData.success === false) {
        dispatch(signinFailed(userData.message));
        toast.error(userData.message);
      } else {
        localStorage.setItem('access_token', userData.token);
        dispatch(signinSuccess(userData));
        navigate("/");
        toast.success("Successfully Signin");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <section className="bg-home zoom-image d-flex align-items-center">
      <div
        className="bg-overlay image-wrap"
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundPosition: "center",
        }}
      ></div>
      <div className="bg-overlay bg-gradient-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="p-4 bg-white rounded-3 shadow-md mx-auto w-100"
              style={{ maxWidth: "400px" }}
            >
              <form onSubmit={handleLogin}>
                <Link to="/">
                  <img src={logo} className="mb-4 d-block mx-auto" alt="" />
                </Link>
                <h5 className="mb-3">Please sign in</h5>

                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    ref={emailRef}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    ref={pwdRef}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <span className="forgot-pass text-muted mb-0">
                    <Link to="/auth-reset-password" className="text-muted">
                      Forgot password?
                    </Link>
                  </span>
                </div>

                <button className="btn btn-primary w-100 mb-3" type="submit">
                  Sign in
                </button>

                <button
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mb-3"
                  type="button"
                  onClick={() => {
                    handleGoogleSignIn();
                  }}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                    className="me-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Sign in with Google
                </button>

                <div className="col-12 text-center mt-3">
                  <span>
                    <span className="text-muted me-2">
                      Don't have an account?
                    </span>{" "}
                    <Link to="/signup" className="text-dark fw-medium">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
