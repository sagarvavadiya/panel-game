import React from "react";
import "./CreateUser.css";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector-1.png";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../reusable/Footer/Footer";
import { Apis } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { PostApi } from "../../AllFunction/AllFunction";
const uniqId = uuidv4();

const CreateUser = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="user-option-body">
        <Navbar />
        <div className="user-option-main">
          <h1>Join as</h1>
          <br />
          <div className="option-container">
            <div
              className="container-child curserPointer"
              onClick={() => {
                PostApi("addPlayer", { playerId: uniqId });
              }}
            >
              <div
                className="user-option-img-container"
                onClick={() => {
                  navigate("/chooseTeam");
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6557/6557800.png"
                  className="user-option-img"
                  alt="student-icon"
                />
              </div>
              <h1>User</h1>
            </div>
            <div className="container-child curserPointer">
              <div
                className="user-option-img-container"
                onClick={() => {
                  navigate("/hostSignUp");
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6557/6557800.png"
                  className="user-option-img"
                  alt="doctor icon"
                />
              </div>
              <h1 className="user-option-title">Host</h1>
            </div>
          </div>
          <br />
          <br />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default CreateUser;
