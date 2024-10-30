const io = require("../index");
const {
  PlayerModel,
  TeamModel,
  GameModel,
  Questions,
} = require("../Model/model");
const { log } = require("console");

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Functionality for send message to all user
//   socket.on("messageToAll", async (data) => {
//     console.log("Message received:", data);
//     // const data = await PlayerModel.find();
//     console.log(data);
//     io.emit("messageToAll", "data");
//   });

//   // Functionality for send message to only room member
//   socket.on("login", (roomId) => {
//     socket.join(roomId);
//     io.in(roomId).emit("user_connected", {
//       Id: `${roomId}`,
//       message: "You successfully connected",
//     });
//   });

//   socket.on("messageToRoomMember", (data) => {
//     console.log("Message received:", data.senderID);
//     io.in(data.senderID).emit("messageToRoomMember", data.data);
//   });

//   // Emiit after disconnect
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
