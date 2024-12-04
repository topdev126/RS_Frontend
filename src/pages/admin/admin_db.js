import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import bg3 from "../../assect/images/bg/03.jpg";
import logo from "../../assect/images/logo-icon-80.png";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handling form submission
  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("Submitting form data:", formData);

    const res = await fetch("http://127.0.0.1:3002/admin/load", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setLoading(false);

    // Handle response data (e.g., show message or redirect)
    if (data.success) {
      console.log("Signup successful", data);
      // Redirect or show success message
    } else {
      console.log("Signup failed", data);
      // Handle failure (e.g., show error message)
    }
  };

  return (
    <>
      <section className="bg-home zoom-image d-flex align-items-center">
        <div
          className="bg-overlay image-wrap"
          style={{
            backgroundImage: `url(${bg3})`,
            backgroundPosition: "center"
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Link to="/">
                    <img src={logo} className="mb-4 d-block mx-auto" alt="" />
                  </Link>
                  <h5 className="mb-3">Register your account</h5>

                  <div className="form-floating mb-2">
                    <input
                      {...register("username", {
                        required: "First name is required"
                      })}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Harry"
                    />
                    <label htmlFor="floatingInput">First Name</label>
                    {errors.username && (
                      <span className="text-danger">
                        {errors.username.message}
                      </span>
                    )}
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingEmail">Email Address</label>
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      {...register("password", {
                        required: "Password is required"
                      })}
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="form-check mb-3">
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
                      I Accept{" "}
                      <Link to="#" className="text-primary">
                        Terms And Conditions
                      </Link>
                    </label>
                  </div>

                  <button
                    className="btn btn-primary w-100 mb-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>

                  <button
                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mb-3"
                    type="button"
                    onClick={() => {
                      // handleGoogleSignUp() - add your Google sign-up logic here
                    }}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google logo"
                      className="me-2"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Sign up with Google
                  </button>

                  <div className="col-12 text-center mt-3">
                    <span>
                      <span className="text-muted me-2">
                        Already have an account?
                      </span>{" "}
                      <Link to="/login" className="text-dark fw-medium">
                        Sign in
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
