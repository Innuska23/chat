import express from "express";
import http from "http";
import dotenv from "dotenv";
import chatSocket from "./controllers/chatSocket.js";
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = http.Server(app);

dotenv.config();

app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);

const io = chatSocket.init(server);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});

export default app;
