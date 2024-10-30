import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./hostSignUp.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Footer from "../reusable/Footer/Footer";
const uniqId = uuidv4();

export default function HostSignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const joinStudent = () => {
    if (name.length !== 0 && password.length !== 0) {
      localStorage.setItem("authware", [
        `Token: ${uniqId} || Name: ${name} || Credential: ${password}`,
      ]);
      navigate("/playgame");
    } else {
      name.length === 0
        ? setAlert("Enter your name first")
        : password.length === 0
        ? setAlert("Enter your password")
        : setAlert(!alert);
    }
  };

  return (
    <div className="hs-student-signup-body">
      <Navbar />
      <div className="hs-student-signup-container">
        <h1 className="hs-signup-title">Host Login</h1>
        <br />
        <br />
        <div>
          <input
            type="text"
            placeholder="Enter host name"
            className="hs-student-signup-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="hs-student-signup-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {alert ? <div className="Alert">{alert}</div> : ""}
        </div>
        <button
          className="hs-student-signup-button"
          variant="contained"
          onClick={joinStudent}
        >
          Login
        </button>
      </div>
    </div>
  );
}
