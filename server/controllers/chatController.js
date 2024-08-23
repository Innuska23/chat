const Chat = require("../models/Chat");

const getChats = async (req, res) => {
  try {
    const chats = await Chat.getChats();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Error reading chats" });
  }
};

const createChat = async (req, res) => {
  try {
    const { chatName } = req.body;
    const newChat = await Chat.createChat(chatName);
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: "Error creating chat" });
  }
};

const editChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { chatName } = req.body;
    const updatedChat = await Chat.updateChat(id, chatName);
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ error: "Error updating chat" });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.deleteChat(id);
    res.json({ message: "Chat deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting chat" });
  }
};

module.exports = { getChats, createChat, editChat, deleteChat };
