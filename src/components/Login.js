import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  sessionStorage.clear();
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", { username, password })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("username", username);
        // navigate("/main-menu");
        window.location.href = "/main-menu";
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          showInvalidLoginAlert();
        } else {
          console.log(err);
        }
      });
  };

  const showInvalidLoginAlert = () => {
    alert("Invalid Login. Please try again.");
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          Welcome to the CERT Incident Management Tool (CIMT)
        </h1>
        <p className="infoText">
          The CIMT is an online web application that manages available resources
          and their assignments to various emergency incidents that may have
          already occurred, are happening or may happen in the future in and
          around the Pasadena City College campus. Emergency incidents may
          include, but are not limited to, hazardous waste spills, act of
          terrorism, nuclear incident, campus shooting, car crashes with
          fatalities, flooding, fire, etc.
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <h2 className="login">Login</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Login;
