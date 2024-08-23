const fs = require("fs").promises;

class Chat {
  constructor(id, name, messages = []) {
    this.id = id;
    this.name = name;
    this.messages = messages;
  }

  static async getChats() {
    try {
      const data = await fs.readFile("chats.json", "utf8");
      const chats = JSON.parse(data).map(
        (chat) => new Chat(chat.id, chat.name, chat.messages)
      );
      return chats;
    } catch (err) {
      console.error("Error reading chats file:", err);
      return [];
    }
  }

  static async createChat(chatName) {
    try {
      const newChat = new Chat(Date.now(), chatName);
      const chats = await this.getChats();
      chats.push(newChat);
      await this.writeChatsToFile(chats);
      return newChat;
    } catch (err) {
      console.error("Error creating chat:", err);
      throw err;
    }
  }

  static async updateChat(id, chatName) {
    try {
      const chats = await this.getChats();
      const chatIndex = chats.findIndex((chat) => chat.id === id);
      if (chatIndex === -1) {
        throw new Error(`Chat with ID ${id} not found`);
      }
      chats[chatIndex].name = chatName;
      await this.writeChatsToFile(chats);
      return chats[chatIndex];
    } catch (err) {
      console.error("Error updating chat:", err);
      throw err;
    }
  }

  static async writeChatsToFile(chats) {
    try {
      await fs.writeFile("chats.json", JSON.stringify(chats), "utf8");
    } catch (err) {
      console.error("Error writing chats file:", err);
      throw err;
    }
  }
}

module.exports = Chat;
