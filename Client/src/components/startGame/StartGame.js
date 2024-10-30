import React from "react";
import "./StartGame.scss";
import startGameScreenImg from "../../assets/startGameScreenImg.png";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../navbar/Navbar";
import Footer from "../reusable/Footer/Footer";
const uniqId = uuidv4();
const StartGame = () => {
  return (
    <>
      <div style={{ position: "absolute" }}>
        <Navbar />
      </div>

      <div className="start-game center">
        <div className="startgame-left">
          <div className="startgame-info">
            <h1 className="main-heading">
              Wait for the host to start the game
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartGame;
