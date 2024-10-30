const express = require("express");
const routes = express.Router();
const QuizController = require("../controller/Controller");

routes.get("/showPlayer", QuizController.ShowPlayer);
routes.post("/addPlayer", QuizController.AddPlayer);
routes.post("/chooseTeam", QuizController.ChooseTeam);
routes.post("/joinTeam", QuizController.JoinTeam);
routes.post("/saveAttendedQuestions", QuizController.saveAttendedQuestions);
routes.post("/hostActions", QuizController.HostActions);
routes.get("/getQuestion", QuizController.GetQuestion);
routes.post("/changeQuestion", QuizController.ChangeQuestion);
module.exports = routes;
