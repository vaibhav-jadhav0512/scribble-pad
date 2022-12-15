import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:8080";
  const history = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch(`${host}/realms/scribble-pad/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        username: credentials.username,
        password: credentials.password,
        grant_type: "password",
      }),
    })
      .then(async function (response) {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        } else {
          const json = await response.json();
          localStorage.setItem("token", json.access_token);
          history("/");
        }
      })
      .catch(function (error) {
        alert("Invalid credentials " + error);
      });
  };
  return (
    <section className="vh-50">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="/images/login.svg"
              className="img-fluid"
              alt="something"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={submitHandler}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control form-control-lg"
                  value={credentials.username}
                  onChange={onChangeHandler}
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  value={credentials.password}
                  onChange={onChangeHandler}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
