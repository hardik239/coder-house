import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import ACTIONS from "./actions.js";
import { Server } from "socket.io";
import roomService from "./services/room-service.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// database

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on("error", (err) => console.log("connection error:", err));
db.once("open", () => {
  console.log("DB connected...");
});

// mongoose.connection.collections["tokens"].drop(function (err) {
//   console.log("collection dropped");
// });
// mongoose.connection.collections["rooms"].drop(function (err) {
//   console.log("collection dropped");
// });
// mongoose.connection.collections["users"].drop(function (err) {
//   console.log("collection dropped");
// });
// middlewares

app.use("/storage", express.static("storage"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST,GET"],
  })
);
app.use(routes);

// socekts io

const socketUserMap = {};
const roomIds = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on(ACTIONS.JOIN, async ({ roomId, user }) => {
    if (!socketUserMap[socket.id]) {
      console.log("user joined", user);
      socketUserMap[socket.id] = user;
      roomIds[socket.id] = roomId;
      const room = await roomService.addSpeaker(roomId, user);
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.ADD_PEER, {
          peerId: socket.id,
          createOffer: false,
          user,
        });
        socket.emit(ACTIONS.ADD_PEER, {
          peerId: clientId,
          createOffer: true,
          user: socketUserMap[clientId],
        });
      });
      socket.join(roomId);
    }
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    console.log("RELAY_ICE");
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    console.log("RELAY_SDP");
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        console.log("mute info");
        io.to(clientId).emit(ACTIONS.MUTE_INFO, {
          userId,
          isMute,
        });
      }
    });
  });

  const leaveRoom = () => {
    console.log("leaving");
    const { rooms } = socket;
    let isRemoved = false;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        // socket.emit(ACTIONS.REMOVE_PEER, {
        //     peerId: clientId,
        //     userId: socketUserMap[clientId]?.id,
        // });
      });
      socket.leave(roomId);
      isRemoved = true;
    });
    if (isRemoved) {
      roomService.removeSpeaker(roomIds[socket.id], socketUserMap[socket.id]);
      delete roomIds[socket.id];
    }
    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);
});

server.listen(8000, () => {
  console.log("listening on PORT", 8000);
});
