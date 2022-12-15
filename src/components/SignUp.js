import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const host = "http://localhost:8080";
  const history = useNavigate();
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rpassword: "",
  });
  const saveToken = async () => {
    const res = await fetch(
      `${host}/realms/scribble-pad/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          grant_type: "client_credentials",
        }),
      }
    );
    const json = await res.json();
    localStorage.setItem("client_token", json.access_token);
  };
  useEffect(() => {
    saveToken();
  }, []);

  const onChangeHandler = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(signup);
    if (signup.password !== signup.rpassword) {
      alert("password not match!");
      return;
    }
    const client_token = localStorage.getItem("client_token");
    const createUser = await fetch(`${host}/admin/realms/scribble-pad/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${client_token}`,
      },
      body: JSON.stringify({
        firstName: signup.firstName,
        lastName: signup.lastName,
        email: signup.email,
        enabled: true,
        username: signup.username,
        credentials: [{ type: "password", value: signup.password }],
      }),
    });
    console.log(createUser.status);
  };
  return (
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h2 fw-bold mb-5">Sign up</p>
                <form className="mx-1 mx-md-4" onSubmit={onSubmitHandler}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={signup.firstName}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="firstName">
                        First Name
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={signup.lastName}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="lastName">
                        Last Name
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={signup.email}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        autoComplete="new-username"
                        value={signup.username}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        autoComplete="new-password"
                        value={signup.password}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        id="rpassword"
                        name="rpassword"
                        className="form-control"
                        value={signup.rpassword}
                        onChange={onChangeHandler}
                      />
                      <label className="form-label" htmlFor="rpassword">
                        Repeat your password
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="/images/signup.webp"
                  className="img-fluid"
                  alt="Sample"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
