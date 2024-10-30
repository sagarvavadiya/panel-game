const {
  PlayerModel,
  TeamModel,
  GameModel,
  Questions,
} = require('./Model/model');

const express = require('express');
const cors = require('cors');
const web = require('./routes/routes');
const app = express();
const dbConnection = require('./DB/db');

const http = require('http');
const socketIO = require('socket.io');

const LiveDataSend = require('./controller/LiveDataSend');
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    credentials: true, // Allow cookies if required
  },
});

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    credentials: true, // Allow cookies if required
  }),
);

app.use(express.json());

const port = 5040;
const url = `mongodb://127.0.0.1:27017/QuizGame`; // Fixed typo in the URL
dbConnection(url);
app.use(web);

app.get('/', (req, res) => {
  res.send('hello');
});

//---------------------------------------------Socket.io Functions ------------------------------------------//
io.on('connection', socket => {
  console.log('A user connected');

  // Functionality for send message to all users
  socket.on('getQuestion', async data => {
    console.log('que_data index:', data.index);
    const QuestionData = await GameModel.find();
    const qdata = await Questions.find();
    io.emit('getQuestion', qdata[data.index]);
  });

  socket.on('AnswerSurvey', async data => {
    const PlayerData = await PlayerModel.find();
    io.emit('AnswerSurvey', PlayerData);
  });

  socket.on('Result', async data => {
    const PlayerData = await PlayerModel.find();
    let teamData = { team1: 0, team2: 0, team3: 0, team4: 0 };
    let questionAttend = { team1: 0, team2: 0, team3: 0, team4: 0 };
    let QIndex = data.QuestionIndex || 0;

    PlayerData.map(i => {
      switch (i.teamId) {
        case 'team1':
          i.questionsList.map(q =>
            q[1] === true ? (teamData.team1 += 1) : null,
          );
          break;
        case 'team2':
          i.questionsList.map(q =>
            q[1] === true ? (teamData.team2 += 1) : null,
          );
          break;
        case 'team3':
          i.questionsList.map(q =>
            q[1] === true ? (teamData.team3 += 1) : null,
          );
          break;
        case 'team4':
          i.questionsList.map(q =>
            q[1] === true ? (teamData.team4 += 1) : null,
          );
          break;
      }
    });

    PlayerData.map(i => {
      switch (i.teamId) {
        case 'team1':
          i.questionsList[QIndex] ? (questionAttend.team1 += 1) : null;
          break;
        case 'team2':
          i.questionsList[QIndex] ? (questionAttend.team2 += 1) : null;
          break;
        case 'team3':
          i.questionsList[QIndex] ? (questionAttend.team3 += 1) : null;
          break;
        case 'team4':
          i.questionsList[QIndex] ? (questionAttend.team4 += 1) : null;
          break;
      }
    });

    io.emit('Result', {
      teamScore: teamData,
      QuestionAttendBy: questionAttend,
    });
  });

  // Functionality to send a message to only room members
  socket.on('login', roomId => {
    socket.join(roomId);
    io.in(roomId).emit('user_connected', {
      Id: `${roomId}`,
      message: 'You successfully connected',
    });
  });

  socket.on('messageToRoomMember', data => {
    io.in(data.senderID).emit('messageToRoomMember', data.data);
  });

  // Emit on disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Running on ${port} port`);
});

module.exports = { io };
