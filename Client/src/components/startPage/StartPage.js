import React from "react";
import "./StartPage.scss";
import group from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="start-page">
      <div className="left">
        <img src={group} alt="" />
      </div>
      <div className="right center">
        <h1>scss summit gamification</h1>
        <div className="btn-container">
          <div className="btn ">
            <button onClick={() => navigate("/userpage")}>Join Room</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
