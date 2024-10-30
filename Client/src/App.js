import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./components/createUser/CreateUser";
import Home from "./components/home/Home";
import StartPage from "./components/startPage/StartPage";
import "react-toastify/dist/ReactToastify.css";
import HostSignUp from "./components/hostSignUp/hostSignUp";
import ChooseTeam from "./components/chooseTeam/chooseTeam";
import StartGame from "./components/startGame/StartGame";
import PlayGame from "./components/playGame/playGame";
import HostQuestions from "./components/questions/HostQuestions";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import SocketData from "./AllFunction/SocketData";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <SocketData />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/startgame/:id" element={<StartGame />} />
          <Route path="/playgame" element={<PlayGame />} />
          <Route path="/chooseTeam" element={<ChooseTeam />} />
          <Route path="/startpage" element={<StartPage />} />
          <Route path="/userpage" element={<CreateUser />} />
          <Route path="/hostSignUp" element={<HostSignUp />} />
          <Route path="/chooseTeam" element={<ChooseTeam />} />
          <Route path="/hostQuestions" element={<HostQuestions />} />
          <Route path="/leaderBoard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
