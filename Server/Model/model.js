const mongoose = require("mongoose");
// teamtable
const TeamSchema = mongoose.Schema({
  teamId: String,
  player: [],
});

const TeamModel = mongoose.model("TeamModel", TeamSchema);

// player table
const PlayerSchema = mongoose.Schema({
  teamId: String,
  playerId: String,
  playerPoint: Number,
  questionsList: [],
});

const PlayerModel = mongoose.model("PlayerModel", PlayerSchema);

// game table
const GameSchema = mongoose.Schema({
  gameStart: Boolean,
  winner: String,
  playerPoint: Number,
  hostId: String,
  password: Number,
  question: Number,
});

const GameModel = mongoose.model("GameModel", GameSchema);

// Questions table
const QuestionsSchema = mongoose.Schema({
  question: String,
  answer: String,
  options: [],
});

const Questions = mongoose.model("Questions", QuestionsSchema);
module.exports = { TeamModel, PlayerModel, GameModel, Questions };
