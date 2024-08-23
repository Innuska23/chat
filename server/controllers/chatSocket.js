const socketIo = require("socket.io");

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer, {
      cors: {
        origin: "http://localhost:5173",
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.IO not initialized");
    }
    return io;
  },
};
