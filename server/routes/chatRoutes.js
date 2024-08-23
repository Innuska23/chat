import express from "express";
const router = express.Router();
import chatController from "../controllers/chatController.js";

router.get("/", chatController.getChats);
router.post("/", chatController.createChat);
router.put("/:id", chatController.editChat);
router.delete("/:id", chatController.deleteChat);

module.exports = router;
