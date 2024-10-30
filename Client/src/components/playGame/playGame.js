import React, { useState } from "react";
import "./playGame.css";
import vector from "../../assets/Vector.png";
import vector1 from "../../assets/Vector-1.png";
import Navbar from "../navbar/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const MemberCardData = [
  { name: "Team 1", number: 10, img: vector },
  { name: "Team 2", number: 20, img: vector },
  { name: "Team 3", number: 30, img: vector },
  { name: "Team 4", number: 40, img: vector },
];
const MemberCard = (props) => {
  return (
    <>
      <div className="pg-container-child curserPointer">
        <div className="pg-user-option-img-container">
          <h1 className="pg-user-option-number">{props.number}</h1>
        </div>
        <h1 className="pg-user-option-title">{props.name}</h1>
      </div>
    </>
  );
};
const uniqId = uuidv4();
const ChooseTeam = () => {
  const [choosenTeam, setChoosenTeam] = useState();
  const navigate = useNavigate();
  return (
    <>
      <div className="pg-user-option-body">
        <Navbar />
        <div className="pg-user-option-main">
          <div className="pg-TitleBox">
            {" "}
            <h1>Welcome, Host</h1>
          </div>
          <h3>Team Members</h3>
          <br />
          <div className="pg-option-container">
            {MemberCardData.map((i) => {
              return (
                <div
                  onClick={() => {
                    setChoosenTeam(i.name);
                  }}
                >
                  <MemberCard name={i.name} number={i.number} img={i.img} />
                </div>
              );
            })}
          </div>
          <br />

          <div className="pg-btn-container">
            <div className="pg-btn">
              <button
                className="pg-button"
                onClick={() => {
                  navigate("/hostQuestions");
                }}
              >{`Start game`}</button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default ChooseTeam;
