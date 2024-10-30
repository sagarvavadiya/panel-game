import React, { useState } from "react";
import "./LeaderBoard.css";
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
      <div className="lb-container-child curserPointer">
        <div className="lb-user-option-img-container">
          <h1 className="lb-user-option-number">{props.number}</h1>
        </div>
        <h1 className="lb-user-option-title">{props.name}</h1>
      </div>
    </>
  );
};
const uniqId = uuidv4();
const LeaderBoard = () => {
  const [choosenTeam, setChoosenTeam] = useState();
  const navigate = useNavigate();
  return (
    <>
      <div className="lb-user-option-body">
        <Navbar />
        <div className="lb-user-option-main">
          <div className="lb-TitleBox">
            {" "}
            <h1>Leaderboard</h1>
          </div>
          <h3>Team Members</h3>
          <br />
          <div className="lb-option-container">
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

          <div className="lb-btn-container">
            <div className="lb-btn">
              <button
                className="lb-button"
                onClick={() => {
                  navigate("/hostQuestions");
                }}
              >{`Back to game`}</button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
